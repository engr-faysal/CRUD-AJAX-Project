async function CreateData(){
    try { // Added: Wraps code in try-catch to handle errors gracefully
        // Validation - Get values and trim whitespace
        // Added: .trim() removes extra spaces from beginning and end of input
        let ProductName = document.getElementById('ProductName').value.trim();
        let UnitPrice = document.getElementById('UnitPrice').value.trim();
        let Stock = document.getElementById('Stock').value.trim();
        let BrandName = document.getElementById('BrandName').value.trim();
        let Category = document.getElementById('Category').value.trim();

        // Check if any field is empty
        // Added: Prevents sending empty data to API - shows alert if any field is blank
        if(!ProductName || !UnitPrice || !Stock || !BrandName || !Category){
            alert("Please fill all fields");
            return;
        }

        let URL = "https://69ef9097112e1b968e24c28c.mockapi.io/CRUD/V1/ServiceCRUD"
        let config = {
            ProductName: ProductName,
            UnitPrice: UnitPrice,
            Stock: Stock,
            BrandName: BrandName,
            Category: Category
        }

        document.getElementById('loader').classList.remove('d-none');

        let response = await axios.post(URL, config);

        document.getElementById('loader').classList.add('d-none');

        // Check for successful status codes (200-299 range)
        // Changed: Now accepts any success code (200, 201, 204) instead of just 200
        if(response.status >= 200 && response.status < 300){
            alert("Data created successfully!");
            window.location = "index.html";
        }
    } catch(error) { // Added: Catches any errors that occur during the process
        // Hide loader and log error
        // Added: Makes sure loading spinner disappears even if error happens
        document.getElementById('loader').classList.add('d-none');
        console.error("Error:", error); // Added: Logs error details to browser console for debugging
        // Added: Shows specific error message from API, or generic message if none available
        alert("Error: " + (error.response?.data?.message || error.message || "Something went wrong"));
    }
}
