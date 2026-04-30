
async function getList(){
    try { // Added: Wraps code in try-catch to handle errors gracefully
        document.getElementById('loader').classList.remove('d-none');
        // Changed: Fixed API URL - was using dummy data API, now uses same API as create.js
        let URL = "https://69ef9097112e1b968e24c28c.mockapi.io/CRUD/V1/ServiceCRUD"
        let response = await axios.get(URL);

        document.getElementById('loader').classList.add('d-none');

        if(response.status === 200){
            // Changed: response.data instead of response.data['data'] - MockAPI returns data directly
            let list = response.data;
            let tableItemList = document.getElementById('tableItemList')
            tableItemList.innerHTML = ""; // Clear previous data - Added: Prevents duplicate data

            list.map(item => {
                tableItemList.innerHTML +=
                    `
                    <tr>
                        <td>${item['ProductName']}</td>
                        <td>${item['UnitPrice']}</td>
                        <td>${item['Stock']}</td>
                        <td>${item['BrandName']}</td>
                        <td>${item['Category']}</td>
                        <td><button onclick="updateItem('${item['id']}')">Update</button></td> <!-- Changed: 'id' instead of '_id' -->
                        <td><button onclick="deleteItem('${item['id']}')">Delete</button></td> <!-- Changed: 'id' instead of '_id' -->
                    </tr>
                    `
            })
        }
    } catch(error) { // Added: Catches any errors that occur during data fetching
        document.getElementById('loader').classList.add('d-none'); // Added: Hides loader on error
        console.error("Error fetching data:", error); // Added: Logs error for debugging
        alert("Error loading data: " + (error.message || "Something went wrong!")); // Added: Shows user-friendly error
    }
}

// Delete Item from table list and refresh the page.
async function deleteItem(id){
    try { // Added: Wraps code in try-catch to handle errors gracefully
        // Changed: Fixed API URL and HTTP method - was GET request to wrong API, now DELETE to correct API
        let URL = `https://69ef9097112e1b968e24c28c.mockapi.io/CRUD/V1/ServiceCRUD/${id}`
        let response = await axios.delete(URL);

        if(response.status === 200){
            document.getElementById('tableItemList').innerHTML = ""
            await getList();
        }
    } catch(error) { // Added: Catches any errors that occur during deletion
        console.error("Error deleting item:", error); // Added: Logs error for debugging
        alert("Error deleting item: " + (error.message || "Something went wrong!")); // Added: Shows user-friendly error
    }
}

// Navigate the update page when button clicked
async function updateItem(id){
    window.location=`update.html?id=${id}`
}

window.onload = getList;