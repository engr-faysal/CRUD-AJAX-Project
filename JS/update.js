
async function fillExistingData() {
        // 1st line: Creates a tool to read the query string
        // 2nd line: Reads the value of id from that tool

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);

    // start for filling Data
    let URL = `https://dummyjson.com/products/${id}`
    document.getElementById('loader').classList.remove('d-none');
    let response = await axios.get(URL);
    document.getElementById('loader').classList.add('d-none');


    //Data Filling begins
    if (response.status === 200) {
        console.log(response);
        let items = response.data['data'][0]

        document.getElementById('ProductID').value = items['_id'];
        document.getElementById('ProductName').value = items['ProductName'];
        document.getElementById('UnitPrice').value = items['UnitPrice'];
        document.getElementById('Stock').value = items['Stock'];
        document.getElementById('BrandName').value = items['BrandName'];
        document.getElementById('Category').value = items['Category'];
    }

}

async function UpdateData() {
    let ProductID = document.getElementById('ProductID').value;
    let ProductName = document.getElementById('ProductName').value;
    let UnitPrice = document.getElementById('UnitPrice').value
    let Stock = document.getElementById('Stock').value;
    let BrandName = document.getElementById('BrandName').value;
    let Category = document.getElementById('Category').value;

    let URL = `https://dummyjson.com/products/${ProductID}`

    document.getElementById('loader').classList.remove('d-none')

    let response = await axios.post(URL,
        {
            ProductName: ProductName,
            UnitPrice:UnitPrice,
            Stock:Stock,
            BrandName:BrandName,
            Category:Category
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