document.addEventListener('DOMContentLoaded', function() {
    var tbody = document.getElementById('runtimeDatas').getElementsByTagName('tbody')[0];

    var testCaseNumber = 0
    var sourceApp = "n1"
    var targetApp = "n2"

    runtimeDatas.forEach(function(rowData) {

        var row = document.createElement('tr');
        if (rowData['test_num'] != null && rowData['test_num'] !== "") {
            testCaseNumber = rowData['test_num']
        }

        Object.keys(rowData).forEach(function(key) {
            var cell = document.createElement('td');

            if ((key === 'source_app' || key === 'target_app' || key === 'complete_num') && rowData['test_num'] === testCaseNumber) {
                cell.setAttribute('rowspan', testCaseNumber);
            } else if (key === 'test_num' && rowData['test_num'] === testCaseNumber) {
                cell.setAttribute('rowspan', testCaseNumber * 3);
            }

            // if (rowData['source_app'] !== sourceApp && rowData['source_app'] != null) {
            //     sourceApp = rowData['source_app']
            // }
            //
            // if (rowData['target_app'] !== targetApp && rowData['target_app'] != null) {
            //     targetApp = rowData['target_app']
            // }

            if ((key === 'source_app' || key === 'target_app' || key === 'complete_num') && (rowData['source_app'] !== sourceApp || rowData['target_app'] !== targetApp)) {
                if (key === 'complete_num' && rowData['source_app'] !== null) {
                    sourceApp = rowData['source_app']
                }
                if (key === 'complete_num' && rowData['target_app'] !== null) {
                    targetApp = rowData['target_app']
                }
                cell.setAttribute('rowspan', testCaseNumber);
            }

            if (key === 'description' || key === 'migrated_type_reason') {
                return
            }
            else {
                if (rowData[key] != null) {
                    if (key === 'source_app' || key === 'target_app') {
                        cell.textContent = rowData[key].toUpperCase();
                    } else if (key !== 'test_id') {
                        cell.textContent = rowData[key];
                    }

                    if (key === 'test_id') {
                        var link = document.createElement('a');
                        link.href = "detail.html?source=" + sourceApp + "&target=" + targetApp + "&id=" + rowData["test_id"];
                        link.textContent = rowData[key];
                        cell.appendChild(link);
                    }


                    row.appendChild(cell);
                }
            }


        });

        tbody.appendChild(row);

    });
});
