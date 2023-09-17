import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import Axios from 'axios';
import Select from 'react-select'; 
import '../css.css';

function Register() {
const [informations, setInformations] = useState([]);
const [Title, setTitle] = useState('');
const [PassportNumber, setPassportNumber] = useState('');
const [FirstName, setFirstName] = useState('');
const [LastName, setLastName] = useState('');
const [TongueLanguage,setTongueLanguage] = useState('');
const [Nationality, setNationality] = useState('');
const [Address, setAddress]= useState('');
const [Country, setCountry] = useState('');
const [Town, setTown] = useState('');
const [Email, setEmail] = useState('');
const [Phone, setPhone] = useState('');
const [Motivation, setMotivation] = useState('');
const [PassportPhoto, setPassportPhoto] = useState(null);
const [DateOfBirth, setDateOfBirth] = useState(''); 
const [isMisterChecked, setIsMisterChecked] = useState(false);
const [isMadamChecked, setIsMadamChecked] = useState(false);
const [isAcademic, setIsAcademic] = useState(false);
const [isImmigrationtoQuebec, setIsImmigrationtoQuebec] = useState(false);
const [isImmigrationtoCanada, setIsImmigrationtoCanada] = useState(false);
const [isIndividual, setIsIndividual] = useState(false);
const [isStudiesinFrance, setIsStudiesinFrance] = useState(false);
const [isAccesstoFrenchnationality, setIsAccesstoFrenchnationality] = useState(false);
const [isProfessional, setIsProfessional] = useState(false);
const [CourseDateID, setCourseDateID] = useState('');
const [courseId, setCourseId] = useState('');


const onChangeFile=e=>{
  setPassportPhoto(e.target.files[0])
}
const [errors, setErrors] = useState({});
const [isValid, setIsValid] = useState(false);

const EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateForm = () => {
  const newErrors = {};

  if (!Title) newErrors.Title = 'Veuillez choisir un titre ';
  if (!PassportNumber) newErrors.PassportNumber = 'Veuillez entrer votre numéro de passeport';
  if (!FirstName) newErrors.FirstName = 'Veuillez entrer votre Prenom';
  if (!LastName) newErrors.LastName = 'Veuillez entrer votre Nom de famille';
  if (!TongueLanguage) newErrors.TongueLanguage = 'Veuillez choisir votre Langue maternelle';
  if (!Nationality) newErrors.Nationality = 'Veuillez sélectionner votre Nationalité';
  if (!Country) newErrors.Country = 'Veuillez sélectionner votre pays';
  if (!Town) newErrors.Town = 'Veuillez entrer votre Ville';
  if (!Phone) newErrors.Phone = 'Veuillez entrer votre Numero de Téléphone';
  if (!Motivation) newErrors.Motivation = 'Veuillez choisir une motivation';
  if (!DateOfBirth) newErrors.DateOfBirth = 'Veuillez sélectionner votre date de naissance';
  if (!Address) newErrors.Address = 'Veuillez entrer votre Adresse';
  if (!PassportPhoto) newErrors.PassportPhoto = 'La photo est nécessaire!';
  if (!Email) newErrors.Email = 'Veuillez entrer votre Email';


  if (Email.trim() && !EmailRegex.test(Email)) {
    newErrors.Email = 'Format d’e-mail non valide';
  }

  setErrors(newErrors);
  setIsValid(Object.keys(newErrors).length === 0);
};


const handleSubmit = (e) => {
  e.preventDefault();
  validateForm();

  if (isValid) {
    const formData = new FormData();
    formData.append('Title', Title);
    formData.append('PassportNumber', PassportNumber);
    formData.append('FirstName', FirstName);
    formData.append('LastName', LastName);
    formData.append('TongueLanguage', TongueLanguage);
    formData.append('Nationality', Nationality);
    formData.append('Country', Country);
    formData.append('Town', Town);
    formData.append('Email', Email);
    formData.append('Phone', Phone);
    formData.append('Motivation', Motivation);
    formData.append('DateOfBirth', DateOfBirth);
    formData.append('Address', Address);
    formData.append('PassportPhoto', PassportPhoto);

    Axios
      .post('http://localhost:8000/register/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
useEffect(() => {
  Axios
    .get('http://localhost:8000/register/get')
    .then((response) => setInformations(response.data))
    .catch((error) => console.log(error));
}, []);


const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
  'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon',
  'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)', 'Costa Rica',
  'Croatia', 'Cuba', 'Cyprus', 'Czechia (Czech Republic)', 'Democratic Republic of the Congo (Congo-Kinshasa)', 'Denmark', 'Djibouti',
  'Dominica', 'Dominican Republic', 'East Timor (Timor-Leste)', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia',
  'Eswatini (fmr. "Swaziland")', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece',
  'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia',
  'Iran', 'Iraq', 'Ireland', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
  'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
  'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (formerly Burma)', 'Namibia',
  'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia (formerly Macedonia)',
  'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
  'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
  'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
  'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan',
  'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago',
  'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America',
  'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
];

const nationalities = [
  'Afghan', 'Albanian', 'Algerian', 'American', 'Andorran', 'Angolan', 'Antiguans', 'Argentinean', 'Armenian', 'Australian',
  'Austrian', 'Azerbaijani', 'Bahamian', 'Bahraini', 'Bangladeshi', 'Barbadian', 'Belarusian', 'Belgian', 'Belizean', 'Beninese',
  'Bhutanese', 'Bolivian', 'Bosnian', 'Brazilian', 'British', 'Bruneian', 'Bulgarian', 'Burkinabe', 'Burmese', 'Burundian',
  'Cambodian', 'Cameroonian', 'Canadian', 'Cape Verdean', 'Central African', 'Chadian', 'Chilean', 'Chinese', 'Colombian', 'Comoran',
  'Congolese', 'Costa Rican', 'Croatian', 'Cuban', 'Cypriot', 'Czech', 'Danish', 'Djibouti', 'Dominican', 'Dutch', 'East Timorese',
  'Ecuadorean', 'Egyptian', 'Emirian', 'Equatorial Guinean', 'Eritrean', 'Estonian', 'Ethiopian', 'Fijian', 'Filipino', 'Finnish',
  'French', 'Gabonese', 'Gambian', 'Georgian', 'German', 'Ghanaian', 'Greek', 'Grenadian', 'Guatemalan', 'Guinea-Bissauan', 'Guinean',
  'Guyanese', 'Haitian', 'Herzegovinian', 'Honduran', 'Hungarian', 'I-Kiribati', 'Icelander', 'Indian', 'Indonesian', 'Iranian',
  'Iraqi', 'Irish', 'Italian', 'Ivorian', 'Jamaican', 'Japanese', 'Jordanian', 'Kazakhstani', 'Kenyan', 'Kittian and Nevisian',
  'Kuwaiti', 'Kyrgyz', 'Laotian', 'Latvian', 'Lebanese', 'Liberian', 'Libyan', 'Liechtensteiner', 'Lithuanian', 'Luxembourger',
  'Macedonian', 'Malagasy', 'Malawian', 'Malaysian', 'Maldivan', 'Malian', 'Maltese', 'Marshallese', 'Mauritanian', 'Mauritian',
  'Mexican', 'Micronesian', 'Moldovan', 'Monacan', 'Mongolian', 'Moroccan', 'Mosotho', 'Motswana', 'Mozambican', 'Namibian',
  'Nauruan', 'Nepalese', 'New Zealander', 'Ni-Vanuatu', 'Nicaraguan', 'Nigerian', 'Nigerien', 'North Korean', 'Northern Irish',
  'Norwegian', 'Omani', 'Pakistani', 'Palauan' ,'Palestinian', 'Panamanian', 'Papua New Guinean', 'Paraguayan', 'Peruvian', 'Polish', 'Portuguese',
  'Qatari', 'Romanian', 'Russian', 'Rwandan', 'Saint Lucian', 'Salvadoran', 'Samoan', 'San Marinese', 'Sao Tomean', 'Saudi',
  'Scottish', 'Senegalese', 'Serbian', 'Seychellois', 'Sierra Leonean', 'Singaporean', 'Slovakian', 'Slovenian', 'Solomon Islander',
  'Somali', 'South African', 'South Korean', 'Spanish', 'Sri Lankan', 'Sudanese', 'Surinamer', 'Swazi', 'Swedish', 'Swiss', 'Syrian',
  'Taiwanese', 'Tajik', 'Tanzanian', 'Thai', 'Togolese', 'Tongan', 'Trinidadian or Tobagonian', 'Tunisian', 'Turkish', 'Tuvaluan',
  'Ugandan', 'Ukrainian', 'Uruguayan', 'Uzbekistani', 'Venezuelan', 'Vietnamese', 'Welsh', 'Yemenite', 'Zambian', 'Zimbabwean',
];
const countryOptions = countries.map((country) => ({
  value: country,
  label: country,
}));
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDateParam = queryParams.get('date');
  const totalCostParam = queryParams.get('cost');
  const feesParam = queryParams.get('fees');
  const infoidParam = queryParams.get('infoid');
  const CurrencyParam = queryParams.get('Currency');
  const titleParam = queryParams.get('title');

  const selectedDate = selectedDateParam
    ? new Date(selectedDateParam).toLocaleDateString()
    : '';

  return (
   

    <div style={{backgroundColor: 'whitesmoke'}}>
      <Header />
                <div className="row d-flex">
                  <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
              <h1 className="d-flex justify-content-center align-items-center mt-5 ">Inscription
</h1> 
<p className="d-flex justify-content-center align-items-center mt-2 ">(veuillez remplir toutes les cases ci-dessous)
 </p>
 </div>
 <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5  mt-5 ">
        <h4>{titleParam}</h4>
        <div>
          <label>Cost:</label>
          <strong>
          {CurrencyParam}
      {totalCostParam !== null ? (
        <>{totalCostParam}</>
      ) : (
        feesParam
      )}
          </strong>
        </div>
      </div>
 </div>
<div className='row d-flex justify-content-center'>
  <div className="col-8">
  <div className=" d-flex justify-content-center align-items-center m-4">
        <form className="col-xl-8 col-lg-8 col-md-8 col-sm-8" onSubmit={(e)=>handleSubmit(e)} >
            <div className="mb-3 px-2 row ">
          <h4 className="form-group mb-2" htmlFor="title">
            Titre <span className="text-danger">*</span>
            <div className="d-flex justify-content-start mt-2">
            <div className="form-check">
  <input type="radio" className="form-check-input" id="titlecheck1" name="firstradio"
   checked={isMadamChecked}
   onChange={() => {
     setIsMisterChecked(false);
     setIsMadamChecked(true);
     setTitle('Madame');
   }}
    />
  <label className="form-check-label" htmlFor="titlecheck1">Madame</label>

</div>
            <div className="form-check">
  <input type="radio" className="form-check-input" id="titlecheck2" name="firstradio"
 checked={isMisterChecked}
 onChange={() => {
  console.log('Mister radio selected'); 
   setIsMisterChecked(true);
   setIsMadamChecked(false);
   setTitle('Monsieur');
 }}
  />
  <label className="form-check-label me-4" htmlFor="titlecheck2">Monsieur</label>
</div>


</div>
          </h4>
        {errors.Title && <p className="text-danger m-1 ">{errors.Title}</p>}
            </div>            
            <div className="row mb-3 px-2">
          <label className="form-label mb-2 " htmlFor="passportNumber"> 
          Numéro passeport ou Titre de séjour ou Carte nationale d'identité <span className="text-danger">*</span> </label>
            <input type="text" className="form-control mb-2" name="PassportNumber" id="PassportNumber"
            onChange={(e) => setPassportNumber(e.target.value)}
            placeholder="Enter your passport number" />
          
        {errors.PassportNumber && <p className="text-danger m-1 ">{errors.PassportNumber}</p>}

            </div>  


            <div className="mb-3 px-2 d-flex justify-content-between">
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="firstName" className="form-label mb-2">Prenom <span className="text-danger">*</span></label>
    <input
      type="text"
      className="form-control"
      name="firstName"
      id="firstName"
      onChange={(e) => setFirstName(e.target.value)}
      placeholder="Enter your first name"
    />
                        {errors.FirstName && <p className="text-danger m-1 ">{errors.FirstName}</p>}

  </div>
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="lastName" className="form-label mb-2">Nom de Famille <span className="text-danger">*</span></label>
    <input
      type="text"
      className="form-control"
      name="lastName"
      id="lastName"
            onChange={(e) => setLastName(e.target.value)}
      placeholder="Enter your lastName"
    />
    {errors.LastName && <p className="text-danger m-1 ">{errors.LastName}</p>}
  </div>
</div>


<div className="mb-3 px-2 d-flex justify-content-between">
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="dateOfBirth" className="form-label mb-2">Date de naissance <span className="text-danger">*</span></label>
    <input
      type="date"
      className="form-control"
      name="dateOfBirth"
      id="dateOfBirth"
            onChange={(e) => setDateOfBirth(e.target.value)}
      placeholder="Enter your date of birth"
    />
    {errors.DateOfBirth && <p className="text-danger m-1 ">{errors.DateOfBirth}</p>}
  </div>
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
          <label htmlFor="nationality" className="form-label mb-2">
            Nationalité <span className="text-danger">*</span>
          </label>
          <Select
            options={nationalities.map((nationality, index) => ({
              value: nationality,
              label: nationality,
            }))}
            value={{ value: Nationality, label: Nationality }}
            onChange={(selectedOption) => setNationality(selectedOption.value)}
            placeholder="Choisir..."
            isSearchable={true} 
          />
          {errors.Nationality && <p className="text-danger m-1 ">{errors.Nationality}</p>}
        </div>

</div>

<div className="mb-3 px-2 d-flex justify-content-between">
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
  <label htmlFor="language" className="form-label mb-2">
    Langue maternelle <span className="text-danger">*</span>
  </label>
  <select
  className="form-control"
  name="language"
  id="language"
  value={TongueLanguage}
  onChange={(e) => setTongueLanguage(e.target.value)}
>
  <option value="" disabled>
  Choisir...
  </option>
  <option value="Arabic">Arabic</option>
  <option value="English">English</option>
  <option value="French">French</option>
</select>

  {errors.TongueLanguage && <p className="text-danger m-1 ">{errors.TongueLanguage}</p>}
</div>

  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="address" className="form-label mb-2">Adresse <span className="text-danger">*</span></label>
    <input
      type="text"
      className="form-control"
      name="address"
      id="address"
            onChange={(e) => setAddress(e.target.value)}

      placeholder="Enter your address"
    />
 {errors.Address && <p className="text-danger m-1 ">{errors.Address}</p>}
  </div>
</div>

<div className="mb-3 px-2 d-flex justify-content-between">
 <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
  <label htmlFor="country" className="form-label mb-2">
    Pays <span className="text-danger">*</span>
  </label>
  <Select
            options={countryOptions}
            value={{ value: Country, label: Country }}
            onChange={(selectedOption) => setCountry(selectedOption.value)}
            placeholder="Choisir..."
            isSearchable={true} // Enable search
          />
  {errors.Country && <p className="text-danger m-1 ">{errors.Country}</p>}
</div>

  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="town" className="form-label mb-2">Ville <span className="text-danger">*</span></label>
    <input
      type="text"
      className="form-control"
      name="town"
      id="town"
            onChange={(e) => setTown(e.target.value)}

      placeholder="Enter your town"
    />
    {errors.Town && <p className="text-danger m-1 ">{errors.Town}</p>}
  </div>
</div>

<div className="mb-3 px-2 d-flex justify-content-between">
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="email" className="form-label mb-2">Email <span className="text-danger">*</span></label>
    <input
      type="text"
      className="form-control"
      name="email"
      id="email"
            onChange={(e) => setEmail(e.target.value)}

      placeholder="Enter your email"
    />
     {errors.Email && <p className="text-danger m-1 ">{errors.Email}</p>}
  </div>
  <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5">
    <label htmlFor="phonenumber" className="form-label mb-2">Téléphone <span className="text-danger">*</span></label>
    <input
      type="text"
      className="form-control"
      name="phonenumber"
      id="phonenumber"
            onChange={(e) => setPhone(e.target.value)}

      placeholder="Enter your phone number"
    />
        {errors.Phone && <p className="text-danger m-1 ">{errors.Phone}</p>}
  </div>
</div>


<div className="mb-3 px-2 row ">
          <h3 className="form-group mb-4" htmlFor="motivation">
          Motivation <span className="text-danger">*</span>
            <div className="d-flex justify-content-between align-items-center">
            <div className="form-check">
  <input type="radio" className="form-check-input mt-4" id="titlecheck3" name="secondradio"
   checked={isAcademic}
   onChange={() => {
     setIsProfessional(false);
     setIsAccesstoFrenchnationality(false);
     setIsImmigrationtoCanada(false);
     setIsImmigrationtoQuebec(false);
     setIsIndividual(false);
     setIsStudiesinFrance(false);
     setIsAcademic(true);
     setMotivation('Academic');
   }}
   />
  <label className="form-check-label mt-4 " htmlFor="titlecheck3">Academic</label>
</div>

<div className="form-check">
  <input type="radio" className="form-check-input mt-4" id="titlecheck4" name="secondradio" 
 checked={isImmigrationtoQuebec}
 onChange={() => {
  setIsProfessional(false);
     setIsAccesstoFrenchnationality(false);
     setIsImmigrationtoCanada(false);
     setIsIndividual(false);
     setIsStudiesinFrance(false);
     setIsAcademic(false);
   setIsImmigrationtoQuebec(true);
   setMotivation('Immigration to Quebec');
 }} />
  <label className="form-check-label mt-4" htmlFor="titlecheck4">Immigration to Quebec</label>
</div>
</div>
<div className="d-flex justify-content-between align-items-center">
            <div className="form-check">
  <input type="radio" className="form-check-input mt-4" id="titlecheck5" name="secondradio"
 checked={isImmigrationtoCanada}
 onChange={() => {
  setIsProfessional(false);
  setIsAccesstoFrenchnationality(false);
  setIsImmigrationtoCanada(true);
  setIsIndividual(false);
  setIsStudiesinFrance(false);
  setIsAcademic(false);
setIsImmigrationtoQuebec(true);
   setMotivation('Immigration to Canada');
 }} />
  <label className="form-check-label mt-4 " htmlFor="titlecheck5">Immigration to Canada</label>
</div>

<div className="form-check">
  <input type="radio" className="form-check-input mt-4" id="titlecheck6" name="secondradio"
  checked={isIndividual}
  onChange={() => {
    setIsProfessional(false);
    setIsAccesstoFrenchnationality(false);
    setIsImmigrationtoCanada(false);
    setIsIndividual(true);
    setIsStudiesinFrance(false);
    setIsAcademic(false);
  setIsImmigrationtoQuebec(true);    setMotivation('Individual');
  }} />
  <label className="form-check-label mt-4" htmlFor="titlecheck6">Individual</label>
</div>
</div>

<div className="d-flex justify-content-between align-items-center">
            <div className="form-check">
  <input type="radio" className="form-check-input mt-4" id="titlecheck7" name="secondradio"
 checked={isStudiesinFrance}
 onChange={() => {
  setIsProfessional(false);
  setIsAccesstoFrenchnationality(false);
  setIsImmigrationtoCanada(false);
  setIsIndividual(false);
  setIsStudiesinFrance(true);
  setIsAcademic(false);
setIsImmigrationtoQuebec(true);   setMotivation('Studies in France');
 }} />
  <label className="form-check-label mt-4 " htmlFor="titlecheck7">Studies in France</label>
</div>

<div className="form-check">
  <input type="radio" className="form-check-input mt-4" id="titlecheck8" name="secondradio"
 checked={isAccesstoFrenchnationality}
 onChange={() => {
  setIsProfessional(false);
  setIsAccesstoFrenchnationality(true);
  setIsImmigrationtoCanada(false);
  setIsIndividual(false);
  setIsStudiesinFrance(false);
  setIsAcademic(false);
setIsImmigrationtoQuebec(true);   setMotivation('Access to French nationality');
 }} />
  <label className="form-check-label mt-4" htmlFor="titlecheck8">Access to French nationality</label>
</div>
</div>
<div className="d-flex justify-content-between align-items-start">
            <div className="form-check">
  <input type="radio" className="form-check-input mt-4" id="titlecheck9" name="secondradio"
 checked={isProfessional}
 onChange={() => {
  setIsProfessional(true);
  setIsAccesstoFrenchnationality(false);
  setIsImmigrationtoCanada(false);
  setIsIndividual(false);
  setIsStudiesinFrance(false);
  setIsAcademic(false);
setIsImmigrationtoQuebec(true);   setMotivation('Professional');
 }}  />
  <label className="form-check-label mt-4 " htmlFor="titlecheck9">Professional</label>
</div>
</div>
          </h3>
          {errors.Motivation && <p className="text-danger m-1 ">{errors.Motivation}</p>}

            </div> 
<div className="mb-3 px-2 row d-flex justify-content-start ">
<h3 className="mb-4 text-black">Photo de la carte d’identité ou du passeport  <span className="text-danger">*</span></h3>
<h4 className="mb-4 ">veuillez télécharger une photo de votre carte d'identité ou de votre passeport.</h4>
<input type="file" 
  onChange={onChangeFile}
  className = "mb-2"

/>
    {errors.PassportPhoto && <p className="text-danger m-1 mb-3 ">{errors.PassportPhoto}</p>}

</div>
<div className=" d-flex justify-content-start align-items-start col-xl-5 col-lg-5 col-md-5 col-sm-5 ">
  <button
    className="bg-primary text-white rounded font-bold py-2 px-4 shadow-outline"
    type="submit"
  >
    Submit
  </button>

</div>
</form>
</div>
</div>



 
  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 d-flex justify-content-start align-items-start ">
      
      <div className="d-flex justify-content-start align-items-start ">
        {informations.map((information) => (
          <p key={information._id}>{information.info.trim()}</p>
        ))}
      </div>
    </div>




</div>
<Footer/>

    </div>
);
};

export default Register;
