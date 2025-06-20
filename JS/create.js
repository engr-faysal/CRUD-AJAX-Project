async function CreateData(){

    let ProductName=document.getElementById('ProductName').value;
    let ProductCode=document.getElementById('ProductCode').value;
    let ProductImg=document.getElementById('ProductImg').value;
    let UnitPrice=document.getElementById('UnitPrice').value;
    let ProductQty=document.getElementById('ProductQty').value;
    let TotalPrice= document.getElementById('TotalPrice').value;

    let URL = "http://164.68.107.70:6060/api/v1/CreateProduct/"
    let config ={
        ProductName: ProductName,
        ProductCode:ProductCode,
        Img:ProductImg,
        UnitPrice:UnitPrice,
        Qty:ProductQty,
        TotalPrice:TotalPrice
    }

    document.getElementById('loader').classList.remove('d-none');

    let response = await axios.post(URL,config)

    document.getElementById('loader').classList.add('d-none');

    if(response.status==200){
        window.location= "index.html";
    }
    else{
        alert("Something went wrong");
    }
}

