
async function fillExistingData() {
        // 1st line: Creates a tool to read the query string
        // 2nd line: Reads the value of id from that tool

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);

    // start for filling Data
    let URL = `http://164.68.107.70:6060/api/v1/ReadProductByID/${id}`
    document.getElementById('loader').classList.remove('d-none');
    let response = await axios.get(URL);
    document.getElementById('loader').classList.add('d-none');


    //Data Filling begins
    if (response.status === 200) {
        console.log(response);
        let items = response.data['data'][0]

        document.getElementById('ProductID').value = items['_id'];
        document.getElementById('ProductName').value = items['ProductName'];
        document.getElementById('ProductCode').value = items['ProductCode'];
        document.getElementById('ProductImg').value = items['Img'];
        document.getElementById('UnitPrice').value = items['UnitPrice'];
        document.getElementById('ProductQty').value = items['Qty'];
        document.getElementById('TotalPrice').value = items['TotalPrice'];
    }

}

async function UpdateData() {
    let ProductID = document.getElementById('ProductID').value;
    let ProductName = document.getElementById('ProductName').value;
    let ProductCode = document.getElementById('ProductCode').value;
    let ProductImg = document.getElementById('ProductImg').value;
    let UnitPrice = document.getElementById('UnitPrice').value
    let ProductQty = document.getElementById('ProductQty').value;
    let TotalPrice = document.getElementById('TotalPrice').value;

    let URL = `http://164.68.107.70:6060/api/v1/UpdateProduct/${ProductID}`

    document.getElementById('loader').classList.remove('d-none')

    let response = await axios.post(URL,
        {
            ProductName: ProductName,
            ProductCode:ProductCode,
            Img:ProductImg,
            UnitPrice:UnitPrice,
            Qty:ProductQty,
            TotalPrice:TotalPrice
        }
    );

    document.getElementById('loader').classList.add('d-none')

    if(response.status===200){
        window.location="index.html"
    }
    else {
        alert("Something went wrong");
    }
}

window.onload = fillExistingData;