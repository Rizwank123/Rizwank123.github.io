// Visitor Tracking
async function trackVisitor() {
    try {
        // Get visitor information
        const visitorInfo = {
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            language: navigator.language,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            referrer: document.referrer || 'direct'
        };

        try {
            // Get IP and location data from the API using HTTPS
            const response = await fetch('https://ipapi.co/json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const locationData = await response.json();

            // Add location data to visitor info
            Object.assign(visitorInfo, {
                ip: locationData.ip,
                network: locationData.network,
                version: locationData.version,
                city: locationData.city,
                region: locationData.region,
                region_code: locationData.region_code,
                country: locationData.country,
                country_name: locationData.country_name,
                country_code: locationData.country_code,
                country_code_iso3: locationData.country_code_iso3,
                country_capital: locationData.country_capital,
                country_tld: locationData.country_tld,
                continent_code: locationData.continent_code,
                in_eu: locationData.in_eu,
                postal: locationData.postal,
                latitude: locationData.latitude,
                longitude: locationData.longitude,
                timezone: locationData.timezone,
                utc_offset: locationData.utc_offset,
                country_calling_code: locationData.country_calling_code,
                currency: locationData.currency,
                currency_name: locationData.currency_name,
                languages: locationData.languages,
                country_area: locationData.country_area,
                country_population: locationData.country_population,
                asn: locationData.asn,
                org: locationData.org
            });
        } catch (locationError) {
            console.warn('Could not fetch location data:', locationError);
            // Continue with basic visitor info if location fetch fails
        }

        // Send data to visitor endpoint
        const saveResponse = await fetch('https://visitorserver.onrender.com/visitor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(visitorInfo)
        });

        if (!saveResponse.ok) {
            throw new Error('Failed to save visitor data');
        }

        // Update visitor count after successful tracking
        updateVisitorCount();

        console.log('Visitor tracked successfully');
    } catch (error) {
        console.error('Error tracking visitor:', error);
        // Still try to update the count even if tracking fails
        updateVisitorCount();
    }
}

// Function to fetch and display visitor count
async function updateVisitorCount() {
    try {
        const response = await fetch('https://visitorserver.onrender.com/visitor/count');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const count = await response.text();
        console.log('Visitor count received:', count);

        // Create or update visitor count display
        let countDisplay = document.getElementById('visitor-count');
        if (!countDisplay) {
            countDisplay = document.createElement('div');
            countDisplay.id = 'visitor-count';
            document.body.appendChild(countDisplay);
        }

        // Update the count display with responsive content
        countDisplay.innerHTML = `
            <span class="emoji">👥</span>
            <span>Visitors: ${count}</span>
        `;

        // Make sure the display is visible
        countDisplay.style.display = 'flex';

    } catch (error) {
        console.error('Error fetching visitor count:', error);
        // Create error display if count display doesn't exist
        let countDisplay = document.getElementById('visitor-count');
        if (!countDisplay) {
            countDisplay = document.createElement('div');
            countDisplay.id = 'visitor-count';
            document.body.appendChild(countDisplay);
        }
        countDisplay.innerHTML = 'Error loading visitor count';
    }
}

// Call updateVisitorCount when page loads
document.addEventListener('DOMContentLoaded', () => {
    trackVisitor();
    // Also update count after a short delay to ensure it's visible
    setTimeout(updateVisitorCount, 1000);
});

// Sticky Navbar
let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');


window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

menu.onclick = () => {
    navbar.classList.toggle('active');
}
window.onscroll = () => {
    navbar.classList.remove('active');
}

// Dark Mode
let darkmode = document.querySelector('#darkmode');

darkmode.onclick = () => {
    if (darkmode.classList.contains('bx-moon')) {
        darkmode.classList.replace('bx-moon', 'bx-sun');
        document.body.classList.add('active');
    } else {
        darkmode.classList.replace('bx-sun', 'bx-moon');
        document.body.classList.remove('active');
    }
}



// function contshow4(){
//        window.open(href=" https://drive.google.com/uc?export=download&id=1U-Q7IM4qbw90OQSpgbbfruVExkA69Kdo"); 
//         }
//   let my_cont_4=document.querySelector(".RFAL").addEventListener("click",contshow4)









document.querySelector('#resume-link-1').addEventListener("click", () => {
    //console.log("OPENinig.....")
    window.location.assign("https://drive.google.com/file/d/1U-Q7IM4qbw90OQSpgbbfruVExkA69Kdo/view?usp=share_link", "_blank");
})

document.querySelector('#resume-link-2').addEventListener("click", () => {
    //console.log("OPENinig.....")
    window.location.assign("https://drive.google.com/file/d/1U-Q7IM4qbw90OQSpgbbfruVExkA69Kdo/view?usp=share_link", "_blank");
})

