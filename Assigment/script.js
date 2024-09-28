const chemicalData = [
    { id: 1, chemicalName: "Ammonium Persulfate", vendor: "LG Chem", density: 3525.92, viscosity: 68.631, packaging: "Bag", packSize: 100.00, unit: "kg", quantity: 6495.18 },
    { id: 2, chemicalName: "Caustic Potash", vendor: "Formosa", density: 3172.15, viscosity: 48.22, packaging: "Bag", packSize: 100.00, unit: "kg", quantity: 8751.90 },
    { id: 3, chemicalName: "Dimethylaminopropylamine", vendor: "LG Chem", density: 8435.72, viscosity: 12.62, packaging: "Barrel", packSize: 75.00, unit: "L", quantity: 5964.61 },
    { id: 4, chemicalName: "Mono Ammonium Phosphate", vendor: "Sinopec", density: 1597.65, viscosity: 76.51, packaging: "Bag", packSize: 105.00, unit: "kg", quantity: 8183.73 },
    { id: 5, chemicalName: "Ferric Nitrate", vendor: "DowDuPont", density: 364.84, viscosity: 14.98, packaging: "Bag", packSize: 105.00, unit: "kg", quantity: 4154.33 },
    { id: 6, chemicalName: "n-Pentane", vendor: "Sinopec", density: 4535.26, viscosity: 66.76, packaging: "N/A", packSize: 0, unit: "t", quantity: 6272.34 },
    { id: 7, chemicalName: "Glycol Ether PM", vendor: "LG Chem", density: 6495.18, viscosity: 72.12, packaging: "Bag", packSize: 250.00, unit: "kg", quantity: 8749.54 },
    { id: 8, chemicalName: "Sodium Chloride", vendor: "ChemCorp", density: 2160.00, viscosity: 1.93, packaging: "Bag", packSize: 25.00, unit: "kg", quantity: 10000.00 },
    { id: 9, chemicalName: "Sulfuric Acid", vendor: "AcidWorks", density: 1840.00, viscosity: 26.70, packaging: "Bottle", packSize: 2.50, unit: "L", quantity: 5000.00 },
    { id: 10, chemicalName: "Ethanol", vendor: "PureChem", density: 789.00, viscosity: 1.20, packaging: "Drum", packSize: 200.00, unit: "L", quantity: 1000.00 },
    { id: 11, chemicalName: "Hydrogen Peroxide", vendor: "OxyChem", density: 1110.00, viscosity: 1.25, packaging: "Can", packSize: 5.00, unit: "L", quantity: 3000.00 },
    { id: 12, chemicalName: "Acetone", vendor: "SolventCo", density: 790.00, viscosity: 0.32, packaging: "Bottle", packSize: 1.00, unit: "L", quantity: 20000.00 },
    { id: 13, chemicalName: "Hydrochloric Acid", vendor: "AcidWorks", density: 1190.00, viscosity: 1.90, packaging: "Bottle", packSize: 2.50, unit: "L", quantity: 4000.00 },
    { id: 14, chemicalName: "Sodium Hydroxide", vendor: "AlkaliInc", density: 2130.00, viscosity: 79.00, packaging: "Bag", packSize: 25.00, unit: "kg", quantity: 6000.00 },
    { id: 15, chemicalName: "Methanol", vendor: "PureChem", density: 792.00, viscosity: 0.59, packaging: "Drum", packSize: 200.00, unit: "L", quantity: 600.00 }
];

function renderTable() {
    const tbody = document.querySelector('#chemicalTable tbody');
    tbody.innerHTML = '';

    chemicalData.forEach((chemical, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="row-checkbox"></td>
            <td>${index + 1}</td>
            <td>${chemical.chemicalName}</td>
            <td>${chemical.vendor}</td>
            <td>${chemical.density.toFixed(2)}</td>
            <td>${chemical.viscosity.toFixed(3)}</td>
            <td>${chemical.packaging}</td>
            <td>${chemical.packSize.toFixed(2)}</td>
            <td>${chemical.unit}</td>
            <td>${chemical.quantity.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });

    addEditListeners();
}

function addEditListeners() {
    document.querySelectorAll('#chemicalTable tbody td:not(:first-child)').forEach(cell => {
        cell.addEventListener('dblclick', function() {
            const originalContent = this.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = originalContent;
            input.classList.add('form-control');
            this.textContent = '';
            this.appendChild(input);
            this.classList.add('edit-cell');
            input.focus();

            input.addEventListener('blur', function() {
                cell.textContent = this.value;
                cell.classList.remove('edit-cell');
                updateChemicalData();
            });

            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    this.blur();
                }
            });
        });
    });
}

function updateChemicalData() {
    const rows = document.querySelectorAll('#chemicalTable tbody tr');
    rows.forEach((row, index) => {
        const cells = row.cells;
        chemicalData[index] = {
            id: index + 1,
            chemicalName: cells[2].textContent,
            vendor: cells[3].textContent,
            density: parseFloat(cells[4].textContent),
            viscosity: parseFloat(cells[5].textContent),
            packaging: cells[6].textContent,
            packSize: parseFloat(cells[7].textContent),
            unit: cells[8].textContent,
            quantity: parseFloat(cells[9].textContent)
        };
    });
}

document.getElementById('addRow').addEventListener('click', () => {
    const newId = chemicalData.length + 1;
    chemicalData.push({
        id: newId,
        chemicalName: "New Chemical",
        vendor: "New Vendor",
        density: 0,
        viscosity: 0,
        packaging: "New Packaging",
        packSize: 0,
        unit: "kg",
        quantity: 0
    });
    renderTable();
});

document.getElementById('moveUp').addEventListener('click', () => {
    const selectedRows = Array.from(document.querySelectorAll('.row-checkbox:checked')).map(checkbox => checkbox.closest('tr'));
    if (selectedRows.length > 0 && selectedRows[0].previousElementSibling) {
        selectedRows.forEach(row => {
            row.parentNode.insertBefore(row, row.previousElementSibling);
        });
        updateChemicalData();
    }
});

document.getElementById('moveDown').addEventListener('click', () => {
    const selectedRows = Array.from(document.querySelectorAll('.row-checkbox:checked')).map(checkbox => checkbox.closest('tr')).reverse();
    if (selectedRows.length > 0 && selectedRows[0].nextElementSibling) {
        selectedRows.forEach(row => {
            row.parentNode.insertBefore(row.nextElementSibling, row);
        });
        updateChemicalData();
    }
});

document.getElementById('deleteRow').addEventListener('click', () => {
    const selectedRows = document.querySelectorAll('.row-checkbox:checked');
    selectedRows.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const index = Array.from(row.parentNode.children).indexOf(row);
        chemicalData.splice(index, 1);
        row.remove();
    });
    updateChemicalData();
    renderTable();
});

document.getElementById('refreshData').addEventListener('click', renderTable);

document.getElementById('saveData').addEventListener('click', () => {
    updateChemicalData();
    alert('Data saved successfully!');
});

document.getElementById('selectAll').addEventListener('change', function() {
    document.querySelectorAll('.row-checkbox').forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});

renderTable();