
async function getList(){
    try {
        document.getElementById('loader').classList.remove('d-none');
        let URL = "https://69ef9097112e1b968e24c28c.mockapi.io/CRUD/V1/ServiceCRUD"
        let response = await axios.get(URL);

        document.getElementById('loader').classList.add('d-none');

        if(response.status === 200){
            let list = response.data;
            let tableItemList = document.getElementById('tableItemList')
            tableItemList.innerHTML = ""; // Clear previous data

            list.map(item => {
                tableItemList.innerHTML +=
                    `
                    <tr>
                        <td>${item['ProductName']}</td>
                        <td>${item['UnitPrice']}</td>
                        <td>${item['Stock']}</td>
                        <td>${item['BrandName']}</td>
                        <td>${item['Category']}</td>
                        <td><button onclick="updateItem('${item['id']}')">Update</button></td>
                        <td><button onclick="deleteItem('${item['id']}')">Delete</button></td>
                    </tr>
                    `
            })
        }
    } catch(error) {
        document.getElementById('loader').classList.add('d-none');
        console.error("Error fetching data:", error);
        alert("Error loading data: " + (error.message || "Something went wrong!"));
    }
}

// Delete Item from table list and refresh the page.
async function deleteItem(id){
    try {
        let URL = `https://69ef9097112e1b968e24c28c.mockapi.io/CRUD/V1/ServiceCRUD/${id}`
        let response = await axios.delete(URL);

        if(response.status === 200){
            document.getElementById('tableItemList').innerHTML = ""
            await getList();
        }
    } catch(error) {
        console.error("Error deleting item:", error);
        alert("Error deleting item: " + (error.message || "Something went wrong!"));
    }
}

// Navigate the update page when button clicked
async function updateItem(id){
    window.location=`update.html?id=${id}`
}

window.onload = getList;