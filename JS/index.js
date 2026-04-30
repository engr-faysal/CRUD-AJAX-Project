
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
                const itemId = item['id'] || item['_id'] || ''; // Use id from API, fallback to _id if needed
                tableItemList.innerHTML +=
                    `
                    <tr>
                        <td>${item['ProductName']}</td>
                        <td>${item['UnitPrice']}</td>
                        <td>${item['Stock']}</td>
                        <td>${item['BrandName']}</td>
                        <td>${item['Category']}</td>
                        <td><button onclick="updateItem('${encodeURIComponent(itemId)}')">Update</button></td>
                        <td><button onclick="deleteItem('${encodeURIComponent(itemId)}')">Delete</button></td>
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

// Navigate to the update page when the update button is clicked
function updateItem(id){
    if (!id) {
        alert('Unable to update: product id is missing.');
        return;
    }
    // Use window.location.href so the browser always navigates to the update page
    window.location.href = `update.html?id=${id}`;
}

window.onload = getList;