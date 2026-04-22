const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

// --- وظيفة التنظيف والأنميشن ---
const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    header.classList.remove('active');
    setTimeout(() => { header.classList.add('active'); }, 1100);

    navLinks.forEach(link => { link.classList.remove('active'); });
    sections.forEach(sec => { sec.classList.remove('active'); });

    barsBox.classList.remove('active');
    setTimeout(() => { barsBox.classList.add('active'); }, 1100);

    navbar.classList.remove('active');
}

// --- وظيفة الانتقال مع الحفظ ---
function handleNavigation(idx) {
    if (!navLinks[idx].classList.contains('active')) {
        activePage();
        navLinks[idx].classList.add('active');
        
        // حفظ الرقم في ذاكرة المتصفح
        localStorage.setItem('savedSection', idx);

        setTimeout(() => {
            sections[idx].classList.add('active');
        }, 1100);
    }
}

// --- تفعيل الروابط عند الضغط ---
navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        handleNavigation(idx);
    });
});

logoLink.addEventListener('click', () => {
    handleNavigation(0); // العودة للرئيسية
});

// --- عند عمل ريفرش (تفعيل الصفحة المحفوظة) ---
window.addEventListener('load', () => {
    const savedIdx = localStorage.getItem('savedSection');
    
    // إزالة أي كلاس نشط افتراضي لضمان النظافة
    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    if (savedIdx !== null) {
        const i = parseInt(savedIdx);
        navLinks[i].classList.add('active');
        sections[i].classList.add('active');
    } else {
        // إذا لا يوجد شيء محفوظ افتحي الرئيسية
        navLinks[0].classList.add('active');
        sections[0].classList.add('active');
    }
});

// --- كود المنيو للجوال ---
menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// --- كود الـ Resume (تعديل بسيط ليحفظ مكانه أيضاً) ---
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        resumeBtns.forEach(b => b.classList.remove('active'));
        resumeDetails.forEach(d => d.classList.remove('active'));
        
        btn.classList.add('active');
        resumeDetails[idx].classList.add('active');
        
        localStorage.setItem('savedResume', idx);
    });
});

// استرجاع حالة الـ Resume عند الريفرش
window.addEventListener('load', () => {
    const savedRes = localStorage.getItem('savedResume');
    if (savedRes !== null && resumeBtns.length > 0) {
        const i = parseInt(savedRes);
        resumeBtns.forEach(b => b.classList.remove('active'));
        resumeDetails.forEach(d => d.classList.remove('active'));
        resumeBtns[i].classList.add('active');
        resumeDetails[i].classList.add('active');
    }
});

// --- كود الـ Portfolio ---
const arrowRight = document.querySelector('.arrow-right');
const arrowLeft = document.querySelector('.arrow-left');
let portfolioIdx = 0;

if(arrowRight) {
    arrowRight.addEventListener('click', () => {
        const portfolioDetails = document.querySelectorAll('.portfolio-detail');
        const imgSlide = document.querySelector('.img-slide');
        if (portfolioIdx < portfolioDetails.length - 1) {
            portfolioIdx++;
            imgSlide.style.transform = `translateX(calc(${portfolioIdx * -100}% - ${portfolioIdx * 2}rem))`;
            portfolioDetails.forEach(d => d.classList.remove('active'));
            portfolioDetails[portfolioIdx].classList.add('active');
        }
    });
}
// (يمكنك إضافة arrowLeft بنفس المنطق)

// --- الفورم ---
const form = document.getElementById("form");
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const response = await fetch("https://formspree.io/f/mpqyggwj", {
            method: "POST",
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            document.getElementById("msg").style.display = "block";
            form.reset();
        }
    });
}