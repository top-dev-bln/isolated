import { useState } from 'react';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  function scrollToAbout() {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
    
  const handleButtonClick = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

    
    const dataPrivacyText = `We are committed to protecting your privacy. We will only use the information we collect about you lawfully (in accordance with the Data Protection Act 1998). Please read on if you wish to learn more about our privacy policy.`;
    const termsAndConditionsText = `Terms and Conditions ("Terms") Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the https://uploadify.vercel.app/ website (the "Service") operated by Uploadify ("us", "we", or "our"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.`;

    return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
      <div>
        <h1 className='w-full text-3xl font-bold text-[#258EA6]'>Uploadify</h1>
        <p className='py-4'>As a solo developer, Im dedicated to delivering the finest file sharing service. Every feature, every line of code, is my personal commitment to excellence. Your trust drives me forward, and Im grateful for your support on this journey.</p>
      </div>
      <div className='lg:col-span-2 flex justify-between mt-6'>
        <div>
          <h6 className='font-medium text-gray-400'>Helping With</h6>
          <ul>
            <li className='py-2 text-sm'>File Sharing</li>
            <li className='py-2 text-sm'>Communication</li>
            <li className='py-2 text-sm'>Ease of access</li>
            <li className='py-2 text-sm'></li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-gray-400'>Support</h6>
          <ul>
            <li className='py-2 text-sm'><button onClick={() => handleButtonClick('For now it is free, as it is a demo and also made for my atestat')}>Pricing</button></li>
            <li className='py-2 text-sm'><a href='/docs'><button >Documentation</button></a></li>
            <li className='py-2 text-sm'><button onClick={() => handleButtonClick('Just create a page and share the link in order to receive the files')}>How to use</button></li>
            <li className='py-2 text-sm'><a href='https://server-upldfy.vercel.app/'><button >Server status</button></a></li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-gray-400'>Company</h6>
          <ul>
            <li className='py-2 text-sm'><button onClick={scrollToAbout}>About</button></li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-gray-400'>Legal</h6>
          <ul>
            <li className='py-2 text-sm'><button onClick={() => handleButtonClick(dataPrivacyText)}>Data Privacy</button></li>
            <li className='py-2 text-sm'><button onClick={() => handleButtonClick(termsAndConditionsText)}>Terms and Conditions</button></li>
        
          </ul>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md relative">
            <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <p className="mb-4 text-black">{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
