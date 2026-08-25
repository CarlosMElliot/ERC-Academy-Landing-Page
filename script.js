        const steps = document.querySelectorAll(".step");
        const nextBtn = document.getElementById("nextBtn");
        const prevBtn = document.getElementById("prevBtn");
        const submitBtn = document.getElementById("submitBtn");
        const progress = document.getElementById("progress");
        const indicator = document.getElementById("step-indicator");
        const titleText = document.getElementById("step-title");
        const form = document.getElementById("erc-master-form");
        const formHeader = document.getElementById("form-header");
        const successMsg = document.getElementById("success-message");

        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby1Iwk1-oVWakYdSBsmU6JVWUj3-tIgi4nxDf7Kw0R8ynnR7j57RVctOQtlUGwakRcv0A/exec"; 
        let currentStep = 0;

        function toggleField(triggerId, targetIds, requiredValue) {
            const trigger = document.getElementById(triggerId);
            const isMatch = trigger.value === requiredValue;

            targetIds.forEach(id => {
                const field = document.getElementById(id);
                const label = document.getElementById('label-' + id);
                if (isMatch) {
                    field.disabled = false;
                    field.required = true;
                    field.classList.remove('bg-slate-900', 'text-slate-500', 'cursor-not-allowed');
                    field.classList.add('bg-slate-950', 'text-white');
                    if(label) label.classList.replace('text-slate-700', 'text-slate-500');
                } else {
                    field.disabled = true;
                    field.required = false;
                    field.value = '';
                    field.classList.add('bg-slate-900', 'text-slate-500', 'cursor-not-allowed');
                    field.classList.remove('bg-slate-950', 'text-white');
                    if(label) label.classList.replace('text-slate-500', 'text-slate-700');
                }
            });
        }

        function updateForm() {
            steps.forEach((step, index) => {
                step.classList.toggle("active", index === currentStep);
            });

            const percent = ((currentStep + 1) / steps.length) * 100;
            progress.style.width = percent + "%";
            indicator.innerText = `Paso ${currentStep + 1} de ${steps.length}`;
            titleText.innerText = steps[currentStep].getAttribute("data-title");

            prevBtn.classList.toggle("invisible", currentStep === 0);
            
            if (currentStep === steps.length - 1) {
                nextBtn.classList.add("hidden");
                submitBtn.classList.remove("hidden");
            } else {
                nextBtn.classList.remove("hidden");
                submitBtn.classList.add("hidden");
            }
        }

       nextBtn.addEventListener("click", () => {
        const inputs = steps[currentStep].querySelectorAll("input[required], select[required], textarea[required]");
        let valid = true;
        inputs.forEach(input => { 
            if (!input.value || (input.type === "tel" && input.value.length < 4)) { 
                valid = false; 
                input.classList.add("border-red-500"); 
            } else { 
                input.classList.remove("border-red-500"); 
            } 
        });

        if (valid && currentStep < steps.length - 1) {
            
            // --- GOOGLE ANALYTICS EVENT ---
            // We log this BEFORE increasing currentStep so we know which step was just finished.
            if (typeof gtag === 'function') {
                gtag('event', 'form_step_complete', {
                    'step_number': currentStep + 1,
                    'step_title': steps[currentStep].getAttribute("data-title")
                });
            }
            // ------------------------------

            currentStep++;
            updateForm();
            window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
        }
    });

        prevBtn.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                updateForm();
            }
        });

form.addEventListener("submit", e => {
            e.preventDefault();

            // --- ADDED VALIDATION FOR FINAL STEP ---
            const inputs = steps[currentStep].querySelectorAll("input[required], select[required], textarea[required]");
            let valid = true;
            inputs.forEach(input => { 
                if (!input.value || (input.type === "tel" && input.value.length < 4)) { 
                    valid = false; 
                    input.classList.add("border-red-500"); 
                } else { 
                    input.classList.remove("border-red-500"); 
                } 
            });

            if (!valid) {
                alert("Por favor, completa los campos requeridos antes de finalizar.");
                return; // Stop here if not valid
            }
            // ---------------------------------------

            submitBtn.disabled = true;
            submitBtn.innerText = "ENVIANDO...";

            fetch(SCRIPT_URL, { 
                method: 'POST', 
                mode: 'no-cors', 
                body: new FormData(form) 
            })
            .then(() => {
                if (typeof gtag === 'function') {
                    gtag('event', 'generate_lead', {
                        'event_category': 'form',
                        'event_label': 'ERC Academy Registration'
                    });
                }
                form.style.display = 'none';
                formHeader.style.display = 'none';
                successMsg.style.display = 'flex';
                successMsg.classList.add("active");
                window.scrollTo({ top: successMsg.offsetTop - 100, behavior: 'smooth' });
            })
            .catch(error => {
                console.error("Submission Error:", error);
                alert("Error al enviar. Por favor intenta de nuevo.");
                submitBtn.disabled = false;
                submitBtn.innerText = "FINALIZAR REGISTRO";
            });
        });

        // New function to handle the "Volver al inicio" button
        function goToHero() {
            form.reset();
            currentStep = 0;
            updateForm();
            
            // Toggle visibility back
            successMsg.style.display = 'none';
            formHeader.style.display = 'block';
            form.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.innerText = "FINALIZAR REGISTRO";

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        updateForm();
    

    (function() {
        // 1. Configuration
        const ERC_PLACE_ID = 'ChIJz4S04hhF56gRpwtku2_om_8';
        const REVIEWS_CONTAINER = 'google-reviews-container';

        function loadGoogleReviews() {
            const container = document.getElementById(REVIEWS_CONTAINER);
            if (!container || typeof google === 'undefined') return;

            const service = new google.maps.places.PlacesService(document.createElement('div'));

            service.getDetails({
                placeId: ERC_PLACE_ID,
                fields: ['reviews', 'rating', 'user_ratings_total']
            }, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && place.reviews) {
                    container.innerHTML = ''; // Clear the "Conectando..." pulse

                                // 1. ADD THE SUMMARY BADGE HERE
                    const summaryHtml = `
                        <div class="col-span-full flex justify-center mb-10">
                            <div class="flex items-center gap-3 bg-slate-900/60 backdrop-blur-md border border-slate-800 px-4 py-2 rounded-full shadow-lg">
                                <div class="flex items-center gap-2">
                                    <span class="text-white font-black text-lg">${place.rating}</span>
                                    <div class="text-amber-400 flex gap-0.5 text-xs">
                                        ${'★'.repeat(Math.round(place.rating))}
                                    </div>
                                </div>
                                
                                <div class="h-4 w-[1px] bg-slate-700"></div>
                                
                                <div class="flex items-center gap-3">
                                    <span class="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                        ${place.user_ratings_total || '50+'} Opiniones
                                    </span>
                                    <img src="https://www.gstatic.com/images/branding/product/2x/googleg_32dp.png" class="w-4 h-4 opacity-90" alt="Google">
                                </div>
                            </div>
                        </div>
                    `;
                    container.innerHTML = summaryHtml;

                    // We take the top 6 reviews
                    place.reviews.slice(0, 6).forEach(review => {
                        // FIX: This ensures we use the original language if it exists
                        const finalReviewText = review.original_text || review.text;
                        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
                        
                        // Injecting using your "price-card" and "slate" styles
                        const reviewHtml = `
                            <div class="bg-white rounded-3xl p-8 shadow-2xl shadow-blue-500/5 flex flex-col h-full hover:-translate-y-2 transition-all duration-500 border border-slate-100">
                                <div class="flex items-center justify-between mb-4">
                                    <div class="flex items-center gap-3">
                                        <img src="https://www.gstatic.com/images/branding/product/2x/googleg_32dp.png" 
                                             class="w-5 h-5 object-contain" alt="Google">
                                        <div class="flex flex-col">
                                            <span class="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] leading-none">Reseña de Google</span>
                                            <div class="text-amber-400 text-[10px] mt-1 flex gap-0.5">
                                                ${stars}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-emerald-50 text-emerald-600 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter">
                                        Verificado
                                    </div>
                                </div>

                                <div class="text-slate-600 text-[13px] leading-relaxed mb-6 font-medium italic overflow-y-auto max-h-[160px] pr-3 custom-scrollbar">
                                    "${review.text}"
                                </div>

                                <div class="mt-auto pt-5 border-t border-slate-50 flex items-center gap-3">
                                    <img src="${review.profile_photo_url}" 
                                         alt="${review.author_name}"
                                         class="w-9 h-9 rounded-full object-cover border border-slate-100 shadow-sm"
                                         referrerpolicy="no-referrer">
                                    
                                    <span class="text-slate-900 font-black text-[10px] uppercase tracking-widest">
                                        ${review.author_name}
                                    </span>
                                </div>
                            </div>
                        `;
                        container.innerHTML += reviewHtml;
                    });
                } else {
                    container.innerHTML = '<p class="text-slate-500 text-center col-span-full italic">No pudimos cargar las reseñas en este momento.</p>';
                }
            });
        }

        // Run when window loads to ensure Google Maps script is ready
        window.addEventListener('load', loadGoogleReviews);
    })();
