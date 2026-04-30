async function fillExistingData() {
    // This function runs when the update page loads.
    // It reads the id from the page URL and requests the matching item from the API.
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert('No product id found in the URL. Please open this page from the list page.');
        return;
    }

    const URL = `https://69ef9097112e1b968e24c28c.mockapi.io/CRUD/V1/ServiceCRUD/${id}`;

    try {
        document.getElementById('loader').classList.remove('d-none'); // Show loader while request runs
        const response = await axios.get(URL);
        document.getElementById('loader').classList.add('d-none'); // Hide loader after request

        if (response.status === 200) {
            const item = response.data; // MockAPI returns the item directly
            // Codex note: The update page needs the product id before it can save changes.
            // Your MockAPI sends that id as ServiceID, so we use ServiceID first and keep id/_id as backups.
            const itemId = item.ServiceID || item.id || item._id || '';

            if (!itemId) {
                alert('Item data loaded, but the product id is missing in the response.');
                return;
            }

            // Fill the form with values from the API
            document.getElementById('ProductID').value = itemId;
            document.getElementById('ProductName').value = item.ProductName || '';
            document.getElementById('UnitPrice').value = item.UnitPrice || '';
            document.getElementById('Stock').value = item.Stock || '';
            document.getElementById('BrandName').value = item.BrandName || '';
            document.getElementById('Category').value = item.Category || '';
        } else {
            alert('Unable to load item data. Server returned status: ' + response.status);
        }
    } catch (error) {
        document.getElementById('loader').classList.add('d-none');
        console.error('Error loading item:', error);
        alert('Could not load item data. Open the browser console for details.');
    }
}

async function UpdateData() {
    // This function sends the updated form values back to the API.
    const ProductID = document.getElementById('ProductID').value;
    const ProductName = document.getElementById('ProductName').value.trim();
    const UnitPrice = document.getElementById('UnitPrice').value.trim();
    const Stock = document.getElementById('Stock').value.trim();
    const BrandName = document.getElementById('BrandName').value.trim();
    const Category = document.getElementById('Category').value.trim();

    if (!ProductID) {
        alert('Product ID is missing. Please reload this page from the list page.');
        return;
    }

    if (!ProductName || !UnitPrice || !Stock || !BrandName || !Category) {
        alert('Please fill in all fields before updating.');
        return;
    }

    const URL = `https://69ef9097112e1b968e24c28c.mockapi.io/CRUD/V1/ServiceCRUD/${ProductID}`;

    try {
        document.getElementById('loader').classList.remove('d-none'); // Show loader while update runs
        const response = await axios.put(URL, {
            ProductName: ProductName,
            UnitPrice: UnitPrice,
            Stock: Stock,
            BrandName: BrandName,
            Category: Category
        });
        document.getElementById('loader').classList.add('d-none'); // Hide loader after update

        if (response.status >= 200 && response.status < 300) {
            alert('Item updated successfully!');
            window.location = 'index.html'; // Return to the list page after update
        } else {
            alert('Update failed. Status: ' + response.status);
        }
    } catch (error) {
        document.getElementById('loader').classList.add('d-none');
        console.error('Error updating item:', error);
        alert('Could not update item. Open the console for more details.');
    }
}

window.onload = fillExistingData;
