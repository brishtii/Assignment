# Assignment
![image](https://github.com/user-attachments/assets/03bef242-8a79-4cd3-8d8a-bcbb647f1abe)
Overview
This web app helps manage chemical supplies, allowing users to view, add, edit, move, delete, and reorder chemical entries. The app is responsive, working well on both desktop and mobile, and could be extended to work as a Progressive Web App (PWA) for offline use.

Design Choices
HTML Structure (index.html)::
The HTML file structures the app's interface:

1. Toolbar: Contains action buttons such as "Add Row," "Move Up/Down," "Delete," "Refresh," and "Save." These buttons are positioned at the top of the page​(index).
2. Table: Displays chemical data including the chemical name, vendor, density, viscosity, packaging, pack size, unit, and quantity. Each table cell can be edited via JavaScript. A checkbox column is available to select rows for manipulation​(index).

CSS Styling (style.css)::
The design is kept simple and responsive:

1. Minimalist Style: A clean white background and shadowed container provide a clear focus on the data. The Arial font is used for easy readability​(style).
2. Table Layout: Borders and alternating row colors are used to make the table content readable. Input fields appear when cells are edited, allowing in-place modification​(style).
3. Responsive Design: The layout adapts to smaller screens, especially for mobile devices, where buttons in the toolbar adjust into multiple lines. Table cell padding is reduced to fit smaller screens​(style).
   
JavaScript Functionality (script.js)::
The JavaScript file implements all user interactions:

1. Data Representation: Chemical data is stored in an array of objects. Each object represents a chemical and includes details like name, vendor, density, and packaging​(script)​(script).
2. Table Rendering: The renderTable() function generates the rows dynamically based on the current chemical data. This function is called after every interaction, such as adding, moving, or deleting rows​(script)​(script).
3. Cell Editing: Double-clicking any cell allows you to edit it. Once the input loses focus or the "Enter" key is pressed, the changes are reflected in the underlying chemical data​(script).
4. Row Management:
    a. Add Row: Adds a new row with default values.
    b. Move Up/Down: Moves the selected rows up or down within the table.
    c. Delete Row: Deletes selected rows.
    d. Save Data: Saves the updated data, notifying the user via an alert.
    e. Refresh Data: Reloads the table to reflect the current chemical data without saving​(script)​(script).
