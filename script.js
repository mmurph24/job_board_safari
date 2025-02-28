function changeBackground() {
    const searchTerm = document.getElementById('searchTerm').value;
    document.body.style.backgroundColor = searchTerm;
}

function generateSearch() {
    const query = document.getElementById('searchTerm').value.trim();
    const errorMsg = document.getElementById('errorMessage');
    
    errorMsg.style.display = 'none';
    
    if (query === '') {
        errorMsg.textContent = 'Please enter a search term';
        errorMsg.style.display = 'block';
        return;
    }

    const timeRange = document.getElementById('timeRange').value;
    let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(`"${query}"`)}`;
    const sites = [];

    if (document.getElementById('greenhouse').checked) {
        sites.push('site:*boards.greenhouse.io/*');
    }
    if (document.getElementById('llever').checked) {
        sites.push('site:jobs.lever.co/*');
    }
    if (document.getElementById('ashby').checked) {
        sites.push('site:https://jobs.ashbyhq.com/*');
    }
    if (document.getElementById('icims').checked) {
        sites.push('site:icims.com/*');
    }
    if (document.getElementById('taleo').checked) {
        sites.push('site:taleo.net/*');
    }
    if (document.getElementById('workday').checked) {
        sites.push('site:*.myworkdayjobs.com/*');
    }
    if (document.getElementById('workable').checked) {
        sites.push('site:apply.workable.com/*');
    }
    if (document.getElementById('smartrecruiters').checked) {
        sites.push('site:jobs.smartrecruiters.com/*');
    }
    if (document.getElementById('jazz').checked) {
        sites.push('site:app.jazz.co/*');
    }
    if (document.getElementById('jobvite').checked) {
        sites.push('site:jobs.jobvite.com/*');
    }
    if (document.getElementById('breezy').checked) {
        sites.push('site:breezy.hr/*');
    }
    if (document.getElementById('gem').checked) {
        sites.push('site:https://jobs.gem.com/*');
    }
    if (document.getElementById('rippling').checked) {
        sites.push('site:ats.rippling.com/*');
    }
    if (document.getElementById('zoho').checked) {
        sites.push('site:zohorecruit.com/*');
    }
    if (document.getElementById('teamtailor').checked) {
        sites.push('site:teamtailor.com/*');
    }
    if (document.getElementById('eightfold').checked) {
        sites.push('site:app.eightfold.ai/*');
    }

    if (sites.length > 0) {
        searchUrl = `https://www.google.com/search?q=${sites.join(' OR ')} ${encodeURIComponent(`"${query}"`)}`;
    }

    if (timeRange) {
        searchUrl += `&tbs=${timeRange}`;
    }

    window.open(searchUrl, '_blank');
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        generateSearch();
    }
}

function selectAll(categoryId) {
    const checkboxes = document.querySelectorAll(`#${categoryId} input[type="checkbox"]`);
    const button = document.querySelector(`button[onclick="selectAll('${categoryId}')"]`);
    
    const allSelected = Array.from(checkboxes).every(checkbox => checkbox.checked);
    
    checkboxes.forEach(checkbox => checkbox.checked = !allSelected);
    
    updateButtonText(categoryId);
}

function updateButtonText(categoryId) {
    const checkboxes = document.querySelectorAll(`#${categoryId} input[type="checkbox"]`);
    const button = document.querySelector(`button[onclick="selectAll('${categoryId}')"]`);
    
    const allSelected = Array.from(checkboxes).every(checkbox => checkbox.checked);
    button.textContent = allSelected ? "Unselect All" : "Select All";
}

window.onload = function() {
    updateButtonText('popular');
    updateButtonText('other');
    updateButtonText('specialized');

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const parentGroup = this.closest('.checkbox-group');
            if (parentGroup) {
                updateButtonText(parentGroup.id);
            }
        });
    });
};
