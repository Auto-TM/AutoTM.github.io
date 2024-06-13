document.addEventListener('DOMContentLoaded', function() {
    var params = new URLSearchParams(window.location.search);
    var findSourceApp = params.get('source');
    var findTargetApp = params.get('target');
    var testId = params.get('id');
    var sourceApp = 'n1'
    var targetApp = 'n2'
    var testNumber = -1
    var completeNumber = -1

    var detailsTableBody = document.getElementById('detailsTable').getElementsByTagName('tbody')[0];

    var rowData = tableData.find(function(data) {


        if (data.source_app !== sourceApp && data.source_app != null) {
            sourceApp = data.source_app
        }

        if (data.target_app !== targetApp && data.target_app != null) {
            targetApp = data.target_app
        }

        if (data.test_num != null) {
            testNumber = data.test_num
        }

        if (data.complete_num != null) {
            completeNumber = data.complete_num
        }

        return String(data.test_id) === testId && findSourceApp === sourceApp && findTargetApp === targetApp;
    });

    const map = {
        source_app: 'Source App',
        target_app: 'Target App',
        test_num: 'Number of Test Case',
        complete_num: 'Number of Complete Migration',
        test_id: 'Test Id',
        description: 'Test Description',
        migrate_status: 'Migrate Status',
        source_len: 'Number of Source Test Steps',
        source_event_num: 'Number of Source Test Case\'s Event',
        source_oracle_num: 'Number of Source Test Case\'s Oracle',
        migrated_type: 'Migrate Type',
        migrated_type_reason: 'Reason of Migrate Type'
    };
    if (rowData) {
        Object.keys(rowData).forEach(function(key) {
            var row = document.createElement('tr');

            var headerCell = document.createElement('th');
            headerCell.textContent = map[key];
            headerCell.style.width = '170px';
            headerCell.style.textAlign = 'center';
            row.appendChild(headerCell);

            var valueCell = document.createElement('td');
            valueCell.textContent = rowData[key];
            if (key === 'source_app') {
                valueCell.textContent = sourceApp.toUpperCase()
            }
            if (key === 'target_app') {
                valueCell.textContent = targetApp.toUpperCase()
            }
            if (key === 'test_num') {
                valueCell.textContent = testNumber
            }
            if (key === 'complete_num') {
                valueCell.textContent = completeNumber
            }
            row.appendChild(valueCell);

            detailsTableBody.appendChild(row);
        });

    }
});
