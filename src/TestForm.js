import React, { useState } from 'react';

const TestForm = () => {
    const [formData, setFormData] = useState({
        testId: null,
        testName: '',
        testType: '',
        testerEmail: '',
        testerMobile: '',
        alternativeNo: '',
        creationDate: '',
        lastUpdationDate: '',
    });

    const [testTypes, setTestTypes] = useState(['PHP', 'Node Js', 'React Js']);
    const [tableData, setTableData] = useState([]);
    const [newTestType, setNewTestType] = useState('');

    const [validationErrors, setValidationErrors] = useState({
        testName: '',
        testType: '',
        testerEmail: '',
        testerMobile: '',
        alternativeNo: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        // Validate the input
        if (name === 'testName') {
            setValidationErrors({
                ...validationErrors,
                testName: value.match(/^[a-zA-Z ]*$/) ? '' : 'Only Character Should come.',
            });
        } else if (name === 'testType') {
            setValidationErrors({
                ...validationErrors,
                testType: testTypes.includes(value) ? '' : 'Please select a valid test type.',
            });
        } else if (name === 'testerEmail') {
            setValidationErrors({
                ...validationErrors,
                testerEmail: /^\S+@\S+\.\S+$/.test(value) ? '' : 'Please enter a valid email address.',
            });
        } else if (name === 'testerMobile' || name === 'alternativeNo') {
            setValidationErrors({
                ...validationErrors,
                [name]: /^\d{10}$/.test(value) ? '' : 'Please enter a valid 10-digit number.',
            });
        }
    };

    const handleCreateTestType = () => {
        // Check if the new test type already exists
        if (!newTestType.trim()) {
            alert('Please enter a non-empty test type.');
            return;
        }

        if (!testTypes.includes(newTestType)) {
            setTestTypes([...testTypes, newTestType]);
            setFormData({
                ...formData,
                testType: newTestType,
            });
            setNewTestType('');
        } else {
            alert('Test type already exists!');
        }
    };

    const handleFormSubmit = () => {
        // Validate all fields before submitting
        const newValidationErrors = {
            testName: '',
            testType: '',
            testerEmail: '',
            testerMobile: '',
            alternativeNo: '',
        };

        if (!formData.testName.trim()) {
            newValidationErrors.testName = 'Test Name is required.';
        }

        if (!formData.testType.trim()) {
            newValidationErrors.testType = 'Test Type is required.';
        }

        if (!formData.testerEmail.trim() || !/^\S+@\S+\.\S+$/.test(formData.testerEmail)) {
            newValidationErrors.testerEmail = 'Please enter a valid email address.';
        }

        if (!formData.testerMobile.trim() || !/^\d{10}$/.test(formData.testerMobile)) {
            newValidationErrors.testerMobile = 'Please enter a valid 10-digit number.';
        }

        if (formData.alternativeNo.trim() === formData.testerMobile.trim()) {
            newValidationErrors.alternativeNo = 'Alternative No. should not be the same as Tester Mobile No.';
        }

        setValidationErrors(newValidationErrors);

        // Check if there are any validation errors
        if (Object.values(newValidationErrors).some((error) => error)) {
            return;
        }

        // Get the highest testId from the existing data
        const maxTestId = Math.max(...tableData.map((row) => row.testId), 0);

        if (formData.testId === null) {
            // New data submission
            setTableData([
                ...tableData,
                { ...formData, testId: maxTestId + 1, creationDate: new Date().toLocaleString() },
            ]);
        } else {
            // Update existing data
            const updatedData = tableData.map((row) =>
                row.testId === formData.testId ? { ...formData, lastUpdationDate: new Date().toLocaleString() } : row
            );
            setTableData(updatedData);
            setFormData({
                testId: null,
                testName: '',
                testType: '',
                testerEmail: '',
                testerMobile: '',
                alternativeNo: '',
                creationDate: '',
                lastUpdationDate: '',
            });
        }
    };

    const handleEdit = (rowData) => {
        setFormData(rowData);
    };

    const handleDelete = (rowData) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this row?');
        if (confirmDelete) {
            const updatedData = tableData.filter((row) => row.testId !== rowData.testId);
            setTableData(updatedData);
            setFormData({
                testId: null,
                testName: '',
                testType: '',
                testerEmail: '',
                testerMobile: '',
                alternativeNo: '',
                creationDate: '',
                lastUpdationDate: '',
            });
        }

    };

    const getRowColor = (testType) => {
        switch (testType) {
            case 'PHP':
                return 'green';
            case 'Node Js':
                return 'yellow';
            default:
                return 'orange';
        }
    };

    return (
        <div className="test-form-container">
            <h2>Test Form</h2>
            <form className="test-form">
                {/* Form inputs */}
                <div>
                    <label>Test Name:</label>
                    <input
                        type="text"
                        name="testName"
                        value={formData.testName}
                        onChange={handleInputChange}
                    />
                    {validationErrors.testName && (
                        <span style={{ color: 'red' }}>{validationErrors.testName}</span>
                    )}
                </div>

                <div>
                    <label>Test Type:</label>
                    <select
                        name="testType"
                        value={formData.testType}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Test Type</option>
                        {testTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {validationErrors.testType && (
                        <span style={{ color: 'red' }}>{validationErrors.testType}</span>
                    )}

                </div>

                <div>
                    <label>Tester Email:</label>
                    <input
                        type="text"
                        name="testerEmail"
                        value={formData.testerEmail}
                        onChange={handleInputChange}
                    />
                    {validationErrors.testerEmail && (
                        <span style={{ color: 'red' }}>{validationErrors.testerEmail}</span>
                    )}
                </div>

                <div>
                    <label>Tester Mobile No:</label>
                    <input
                        type="text"
                        name="testerMobile"
                        value={formData.testerMobile}
                        onChange={handleInputChange}
                    />
                    {validationErrors.testerMobile && (
                        <span style={{ color: 'red' }}>{validationErrors.testerMobile}</span>
                    )}
                </div>

                <div>
                    <label>Alternative No:</label>
                    <input
                        type="text"
                        name="alternativeNo"
                        value={formData.alternativeNo}
                        onChange={handleInputChange}
                    />
                    {validationErrors.alternativeNo && (
                        <span style={{ color: 'red' }}>{validationErrors.alternativeNo}</span>
                    )}
                </div>

                {/* Hidden fields */}
                <input type="hidden" name="creationDate" value={formData.creationDate} />
                <input type="hidden" name="lastUpdationDate" value={formData.lastUpdationDate} />

                {/* Submit button */}
                <button type="button" onClick={handleFormSubmit}>
                    {formData.testId === null ? 'Submit' : 'Update'}
                </button>
            </form>

            <div className="new-test-type-container">
                <h3>Create New Test Type</h3>
                <input
                    type="text"
                    placeholder="Enter New Test Type"
                    value={newTestType}
                    onChange={(e) => setNewTestType(e.target.value)}
                />
                <button type="button" onClick={handleCreateTestType}>
                    Create Test Type
                </button>
            </div>

            {/* Display table with data */}
            <h2>Test Data Table</h2>
            <table className="test-table">
                <thead>
                    <tr>
                        <th>Test Name</th>
                        <th>Test Type</th>
                        <th>Tester Email</th>
                        <th>Tester Mobile</th>
                        <th>Alternative No</th>
                        <th>Creation Date</th>
                        <th>Last Updation Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row) => (
                        <tr key={row.testId} style={{ backgroundColor: getRowColor(row.testType) }}>
                            <td>{row.testName}</td>
                            <td>{row.testType}</td>
                            <td>{row.testerEmail}</td>
                            <td>{row.testerMobile}</td>
                            <td>{row.alternativeNo}</td>
                            <td>{row.creationDate}</td>
                            <td>{row.lastUpdationDate}</td>
                            <td>
                                <button type="button" onClick={() => handleEdit(row)} style={{ margin: "5px" }}>
                                    Edit
                                </button>
                                <button type="button" onClick={() => handleDelete(row)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestForm;


