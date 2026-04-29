async function CreateData(){
    try {
        // Validation - Get values and trim whitespace
        let ProductName = document.getElementById('ProductName').value.trim();
        let UnitPrice = document.getElementById('UnitPrice').value.trim();
        let Stock = document.getElementById('Stock').value.trim();
        let BrandName = document.getElementById('BrandName').value.trim();
        let Category = document.getElementById('Category').value.trim();

        // Check if any field is empty
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
        if(response.status >= 200 && response.status < 300){
            alert("Data created successfully!");
            window.location = "index.html";
        }
    } catch(error) {
        // Hide loader and log error
        document.getElementById('loader').classList.add('d-none');
        console.error("Error:", error);
        alert("Error: " + (error.response?.data?.message || error.message || "Something went wrong"));
    }
}
