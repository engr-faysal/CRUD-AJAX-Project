
async function getList(){
    document.getElementById('loader').classList.remove('d-none');
    let URL = "http://164.68.107.70:6060/api/v1/ReadProduct"
    let response = await axios.get(URL);

    if(response.status === 200){
        let list=response.data['data'];
        let tableItemList = document.getElementById('tableItemList')

        list.map(item => {
            tableItemList.innerHTML +=
                `
                <tr>
                    <td>${item['ProductCode']}</td>
                    <td>${item['ProductName']}</td>
                    <td>${item['UnitPrice']}</td>
                    <td>${item['Qty']}</td>
                    <td>${item['TotalPrice']}</td>
                    <td><button onclick="updateItem('${item['_id']}')">Update</button></td>
                    <td><button onclick="deleteItem('${item['_id']}')">Delete</button></td>
                </tr>
                `
        })
    }

    else {
        alert('Something went wrong!');
    }
}
// Delete Item from table list and refresh the page.
async function deleteItem(id){
    let URL = `http://164.68.107.70:6060/api/v1/DeleteProduct/${id}`
    let response = await axios.get(URL);

    if(response.status === 200){
        document.getElementById('tableItemList').innerHTML = ""
        await getList();
    }
}

// Navigate the update page when button clicked
async function updateItem(id){
    window.location=`update.html?id=${id}`
}

window.onload = getList;