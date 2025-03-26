document.addEventListener('DOMContentLoaded', () => {
    // Marketplace Functionality
    const equipmentListings = [
        { 
            id: 1, 
            name: 'Tractor', 
            price: 50000, 
            description: 'Gently used tractor, well-maintained',
            seller: 'John Farmer'
        },
        { 
            id: 2, 
            name: 'Seed Drill', 
            price: 15000, 
            description: 'Precision seed drilling machine',
            seller: 'Green Fields Agricultural Supply'
        }
    ];

    const equipmentListingsContainer = document.getElementById('equipment-listings');
    const sellEquipmentBtn = document.getElementById('sell-equipment-btn');
    const sellEquipmentModal = document.getElementById('sell-equipment-modal');
    const closeModalBtn = document.querySelector('.close');

    function renderEquipmentListings() {
        equipmentListingsContainer.innerHTML = equipmentListings.map(item => `
            <div class="equipment-item">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Seller: ${item.seller}</p>
                <p>${item.description}</p>
                <button onclick="contactSeller(${item.id})">Contact Seller</button>
            </div>
        `).join('');
    }

    function contactSeller(id) {
        const equipment = equipmentListings.find(item => item.id === id);
        alert(`Interested in ${equipment.name}. Seller contact details will be shared via registered email.`);
    }

    // Government Scheme Eligibility Checker
    const schemeQuestions = [
        {
            id: 1,
            text: 'What is your farm size (in acres)?',
            type: 'number'
        },
        {
            id: 2,
            text: 'Do you own the land?',
            type: 'select',
            options: ['Yes', 'No']
        },
        {
            id: 3,
            text: 'Are you a small or marginal farmer?',
            type: 'select',
            options: ['Small Farmer', 'Marginal Farmer', 'Large Farmer']
        }
    ];

    const schemeEligibilityForm = document.getElementById('scheme-eligibility-form');
    const schemeQuestionsContainer = document.getElementById('scheme-questions');
    const schemeResultsContainer = document.getElementById('scheme-results');

    function renderSchemeQuestions() {
        schemeQuestionsContainer.innerHTML = schemeQuestions.map(question => `
            <div class="question">
                <label>${question.text}</label>
                ${question.type === 'number' ? 
                    `<input type="number" name="question${question.id}" required>` : 
                    `<select name="question${question.id}" required>
                        ${question.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>`
                }
            </div>
        `).join('');
    }

    function checkSchemeEligibility(formData) {
        const farmSize = formData.get('question1');
        const landOwnership = formData.get('question2');
        const farmerType = formData.get('question3');

        const eligibleSchemes = [];

        if (farmSize <= 2 && landOwnership === 'Yes') {
            eligibleSchemes.push({
                name: 'PM-KISAN Scheme',
                description: 'Financial support for small and marginal farmers',
                link: 'https://pmkisan.gov.in/'
            });
        }

        if (farmerType === 'Small Farmer' || farmerType === 'Marginal Farmer') {
            eligibleSchemes.push({
                name: 'Pradhan Mantri Fasal Bima Yojana',
                description: 'Crop insurance scheme',
                link: 'https://pmfby.gov.in/'
            });
        }

        return eligibleSchemes;
    }

    // Expert Consultancy
    const experts = [
        {
            id: 1,
            name: 'Dr. Rajesh Kumar',
            specialization: 'Crop Science',
            experience: '15 years'
        },
        {
            id: 2,
            name: 'Priya Sharma',
            specialization: 'Agricultural Economics',
            experience: '10 years'
        }
    ];

    const expertListContainer = document.getElementById('expert-list');

    function renderExperts() {
        expertListContainer.innerHTML = experts.map(expert => `
            <div class="expert-card">
                <h3>${expert.name}</h3>
                <p>Specialization: ${expert.specialization}</p>
                <p>Experience: ${expert.experience}</p>
                <button onclick="requestConsultation(${expert.id})">Request Consultation</button>
            </div>
        `).join('');
    }

    function requestConsultation(expertId) {
        const expert = experts.find(e => e.id === expertId);
        alert(`Consultation request sent to ${expert.name}. You will be contacted soon.`);
    }

    // Event Listeners
    sellEquipmentBtn.addEventListener('click', () => {
        sellEquipmentModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        sellEquipmentModal.style.display = 'none';
    });

    schemeEligibilityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(schemeEligibilityForm);
        const eligibleSchemes = checkSchemeEligibility(formData);
        
        schemeResultsContainer.innerHTML = eligibleSchemes.length > 0 
            ? eligibleSchemes.map(scheme => `
                <div class="scheme-result">
                    <h3>${scheme.name}</h3>
                    <p>${scheme.description}</p>
                    <a href="${scheme.link}" target="_blank">Apply Now</a>
                </div>
            `).join('') 
            : '<p>No schemes found matching your profile.</p>';
    });

    // Initial Rendering
    renderEquipmentListings();
    renderSchemeQuestions();
    renderExperts();
});

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });
    
    return isValid;
}