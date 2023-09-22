import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header.js';
import Footer from './Footer.js';
import Axios from 'axios';
import Select from 'react-select'; 
import '../css.css';
import { format, parseISO } from 'date-fns';


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
const [accept, setAccept] = useState(false);

const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const dateidParam = queryParams.get('CourseDateID');
const selectedDateParam = queryParams.get('date');
const totalCostParam = queryParams.get('cost');
const feesParam = queryParams.get('fees');
const infoidParam = queryParams.get('infoid');
const CurrencyParam = queryParams.get('Currency');
const titleParam = queryParams.get('title');


const dateParts = selectedDateParam.split('T');
const formattedDate = dateParts[0]; 


const [BookDate, setBookDate] = useState(formattedDate);

  const [examId, setExamId] = useState(infoidParam);

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
  if (!accept) newErrors.accept = 'Veuillez entrer votre accept';



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
    formData.append('BookDate', formattedDate);
    formData.append('examId', examId);
    formData.append('accept', accept);



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
  
 

  return (
  
    <div style={{backgroundColor: 'whitesmoke'}}>
      
      <Header />
       <div className="container mt-3">
                <form  onSubmit={(e)=>handleSubmit(e)} >
	<div className="row">
		<div className="col-xl-6 col-l-12">
			<div className="row">
				<div className="col mb-3 mt-5">
					<h1>Inscription</h1>
					(veuillez remplir toutes les cases ci-dessous)
				</div>
			</div>
        	<div className="row mt-3">
				<div className="col">
					<div className="form-outline">
                  	<label className="form-label">Titre<span className="text-danger">*</span></label><br/>
                    <div className="form-check form-check-inline">
  <input type="radio" className="form-check-input" id="titlecheck1" name="firstradio"
   checked={isMadamChecked}
   onChange={() => {
     setIsMisterChecked(false);
     setIsMadamChecked(true);
     setTitle('Madame');
   }}
    />
   <label className="form-check-label">
					    Madame
					  </label>
					</div>
<div className="form-check form-check-inline">
  <input type="radio" className="form-check-input" id="titlecheck2" name="firstradio"
 checked={isMisterChecked}
 onChange={() => {
  console.log('Mister radio selected'); 
   setIsMisterChecked(true);
   setIsMadamChecked(false);
   setTitle('Monsieur');
 }}
  />
  <label className="form-check-label">
					    Monsieur
					  </label>
					</div>
                  </div>
        		</div>
                    {errors.Title && <p className="text-danger m-1 ">{errors.Title}</p>}
			</div>
          
             
             <div className="row mt-3">
				<div className="col">
					 <label className="form-label">Numéro passeport ou Titre de séjour ou Carte nationale d'identité <span className="text-danger">*</span></label>
            <input type="text"  className="form-control form-control-md" name="PassportNumber" id="PassportNumber"
            onChange={(e) => setPassportNumber(e.target.value)}
            placeholder="Enter your passport number" />
</div>
        {errors.PassportNumber && <p className="text-danger m-1 ">{errors.PassportNumber}</p>}

			</div>
        


            <div className="row mt-3">
				<div className="col-xl-6 col-l-12">
					 <label className="form-label">Prenom <span className="text-danger">*</span></label>
    <input
      type="text"
      className="form-control form-control-md"
      name="firstName"
      id="firstName"
      onChange={(e) => setFirstName(e.target.value)}
      placeholder="Enter your first name"
    />
                        {errors.FirstName && <p className="text-danger m-1 ">{errors.FirstName}</p>}

</div>
  <div className="col-xl-6 col-l-12">
					 <label className="form-label">Nom de Famille <span className="text-danger">*</span></label>
    <input
      type="text"
className="form-control form-control-md"
      name="lastName"
      id="lastName"
            onChange={(e) => setLastName(e.target.value)}
      placeholder="Enter your lastName"
    />
          {errors.LastName && <p className="text-danger m-1 ">{errors.LastName}</p>}

  </div>

</div>


<div className="row mt-3">
				<div className="col">
					 <label className="form-label">Date de naissance <span className="text-danger">*</span></label>
    <input
      type="date"
className="form-control form-control-md"
      name="dateOfBirth"
      id="dateOfBirth"
            onChange={(e) => setDateOfBirth(e.target.value)}
      placeholder="Enter your date of birth"
    />
  </div>
      {errors.DateOfBirth && <p className="text-danger m-1 ">{errors.DateOfBirth}</p>}
			</div>
  <div className="row mt-3">
				<div className="col">
					<div className="form-outline">
                 <label className="form-label" >Nationalité<span className="text-danger">*</span></label>
          <Select
          className="form-select-md"
            options={nationalities.map((nationality, index) => ({
              value: nationality,
              label: nationality,
            }))}
            value={{ value: Nationality, label: Nationality }}
            onChange={(selectedOption) => setNationality(selectedOption.value)}
            isSearchable={true} 
          />
        </div>
				</div>
          {errors.Nationality && <p className="text-danger m-1 ">{errors.Nationality}</p>}

			</div>

<div className="row mt-3">
				<div className="col">
					<div className="form-outline">
                 <label className="form-label" >Langue maternelle<span className="text-danger">*</span></label>
  <select
className="form-select form-select-md removeSelect"
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

</div>
				</div>
  {errors.TongueLanguage && <p className="text-danger m-1 ">{errors.TongueLanguage}</p>}
			</div>

  <div className="row mt-3">
				<div className="col">
					 <label className="form-label" placeholder="House number and street name">Adresse <span className="text-danger">*</span></label>
    <input
      type="text"
className="form-control form-control-md"
      name="address"
      id="address"
            onChange={(e) => setAddress(e.target.value)}

      placeholder="Enter your address"
    />
  </div>
   {errors.Address && <p className="text-danger m-1 ">{errors.Address}</p>}

			</div>

<div className="row mt-3">
				<div className="col">
					<div className="form-outline">
                 <label className="form-label" >Pays<span className="text-danger">*</span></label>
  
  <Select
  className="form-select-md"
            options={countryOptions}
            value={{ value: Country, label: Country }}
            onChange={(selectedOption) => setCountry(selectedOption.value)}
            placeholder="Choisir..."
            isSearchable={true} 
          />
 </div>
				</div>
  {errors.Country && <p className="text-danger m-1 ">{errors.Country}</p>}

			</div>

  <div className="row mt-3">
				<div className="col">
					 <label className="form-label" >Ville <span className="text-danger">*</span></label>
    <input
      type="text"
className="form-control form-control-md"
      name="town"
      id="town"
            onChange={(e) => setTown(e.target.value)}

      placeholder="Enter your town"
    />
  </div>
      {errors.Town && <p className="text-danger m-1 ">{errors.Town}</p>}

			</div>

<div className="row mt-3">
				<div className="col">
					 <label className="form-label">Email <span className="text-danger">*</span></label>
    <input
      type="text"
className="form-control form-control-md"
      name="email"
      id="email"
            onChange={(e) => setEmail(e.target.value)}

      placeholder="Enter your email"
    />
</div>
     {errors.Email && <p className="text-danger m-1 ">{errors.Email}</p>}

			</div>
        <div className="row mt-3">
				<div className="col">
					 <label className="form-label fw-bold">Téléphone <span className="text-danger">*</span></label>
    <input
      type="text"
      className="form-control form-control-md"
      name="phonenumber"
      id="phonenumber"
            onChange={(e) => setPhone(e.target.value)}

      placeholder="Enter your phone number"
    />
  </div>
          {errors.Phone && <p className="text-danger m-1 ">{errors.Phone}</p>}

			</div>


<div className="row mt-3">
				<div className="col">
          			<h1>Motivation <span className="text-danger">*</span></h1>
          		</div>
          	</div>
 <div className="row">
          		<div className="col-xl-6 col-l-12">
          			<div className="form-check form-check-inline ">
      <input
        type="radio"
         className="form-check-input"
        id="titlecheck3"
        name="secondradio"
        checked={isAcademic}
        onChange={() => {
          setIsProfessional(false);
          setIsAccesstoFrenchnationality(false);
          setIsImmigrationtoCanada(false);
          setIsIndividual(false);
          setIsStudiesinFrance(false);
          setIsAcademic(true);
          setMotivation('Academic');
        }}
      />
     <label className="form-check-label"> Académique </label>
					</div>
          		</div>

  <div className="col-xl-6 col-l-12">
          			<div className="form-check form-check-inline">
      <input
        type="radio"
        className="form-check-input"
        id="titlecheck4"
        name="secondradio"
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
        }}
      />
      <label className="form-check-label"> Immigration au Québec </label>
					</div>
          		</div>
          	</div>

  <div className="row">
          		<div className="col-xl-6 col-l-12">
          			<div className="form-check form-check-inline">
      <input
        type="radio"
        className="form-check-input"
        id="titlecheck5"
        name="secondradio"
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
        }}
      />
     <label className="form-check-label"> Immigration au Canada </label>
					</div>
          		</div>

  <div className="col-xl-6 col-l-12">
          			<div className="form-check form-check-inline">
      <input
        type="radio"
        className="form-check-input"
        id="titlecheck6"
        name="secondradio"
        checked={isIndividual}
        onChange={() => {
          setIsProfessional(false);
          setIsAccesstoFrenchnationality(false);
          setIsImmigrationtoCanada(false);
          setIsIndividual(true);
          setIsStudiesinFrance(false);
          setIsAcademic(false);
          setIsImmigrationtoQuebec(true);
          setMotivation('Individual');
        }}
      />
      <label className="form-check-label"> Individuelle </label>
					</div>
          		</div>
          	</div>

  <div className="row">
          		<div className="col-xl-6 col-l-12">
          			<div className="form-check form-check-inline">
      <input
        type="radio"
        className="form-check-input"
        id="titlecheck7"
        name="secondradio"
        checked={isStudiesinFrance}
        onChange={() => {
          setIsProfessional(false);
          setIsAccesstoFrenchnationality(false);
          setIsImmigrationtoCanada(false);
          setIsIndividual(false);
          setIsStudiesinFrance(true);
          setIsAcademic(false);
          setIsImmigrationtoQuebec(true);
          setMotivation('Studies in France');
        }}
      />
      <label className="form-check-label"> Etudes en France </label>
					</div>
          		</div>

  <div className="col-xl-6 col-l-12">
          			<div className="form-check form-check-inline">
      <input
        type="radio"
        className="form-check-input"
        id="titlecheck8"
        name="secondradio"
        checked={isAccesstoFrenchnationality}
        onChange={() => {
          setIsProfessional(false);
          setIsAccesstoFrenchnationality(true);
          setIsImmigrationtoCanada(false);
          setIsIndividual(false);
          setIsStudiesinFrance(false);
          setIsAcademic(false);
          setIsImmigrationtoQuebec(true);
          setMotivation('Access to French nationality');
        }}
      />
     <label className="form-check-label"> Accès à la nationalité française </label>
					</div>
          		</div>
          	</div>

  <div className="row">
          		<div className="col">
          			<div className="form-check form-check-inline ">
      <input
        type="radio"
        className="form-check-input "
        id="titlecheck9"
        name="secondradio"
        checked={isProfessional}
        onChange={() => {
          setIsProfessional(true);
          setIsAccesstoFrenchnationality(false);
          setIsImmigrationtoCanada(false);
          setIsIndividual(false);
          setIsStudiesinFrance(false);
          setIsAcademic(false);
          setIsImmigrationtoQuebec(true);
          setMotivation('Professional');
        }}
      />
      <label className="form-check-label"> Professionnelle </label>
					</div>
          		</div>
              {errors.Motivation && <p className="text-danger m-1 ">{errors.Motivation}</p>}
          	</div>
				
                  <div className="row mt-4 mb-5">
			<div className="col">
			<h3>Photo de la carte d’identité ou du passeport <span className="text-danger">*</span> </h3>
			<p className="mt-3">veuillez télécharger une photo de votre carte d'identité ou de votre passeport.</p>
			<br/>
<input type="file" 
  onChange={onChangeFile}
 className="form-control"/>
			</div>
          {errors.PassportPhoto && <p className="text-danger m-1 mb-3 ">{errors.PassportPhoto}</p>}
		</div>
		</div>


<div className="col-xl-6 col-l-12 mb-3">
			<div className="row mt-3">
				<div className="col">
					<div className="card">
          <div className="card-header bg-white mt-1 ">

          <span>{titleParam}</span>
           </div>
            <div className="card-body" >
              <div className="row">
        <div className="col-7">
        <b>Total</b>
        </div>
        <div className="col-5 ">
          <b>{CurrencyParam}
      {totalCostParam !== null ? (
        <>{totalCostParam}</>
      ) : (
        feesParam
      )}</b>
      </div>
      </div>
            </div>
          
            </div>
      
        </div>
				</div>

<div className="row mt-2">
				<div className="col">
					<div className="card">
          {informations.map((information) => (
            <div className="card-body" key={information._id}>
        <p  className="ms-1" style={{fontSize: '20px'}}>{information.info}</p>

             <div className="m-1 text-justify p-3" style={{ backgroundColor: "#eeeff0", color: "#515151", fontSize: "15px" }}
>
      <p style={{ fontFamily: 'Times New Roman', textAlign: 'justify', fontSize: '15px',}}>{information.p1}</p>
      <p style={{ fontFamily: 'Times New Roman', textAlign: 'justify', fontSize: '15px',}} >{information.p2}</p>
      <p style={{ fontFamily: 'Times New Roman', textAlign: 'justify', fontSize: '15px',}}>{information.p3}</p>
      <p style={{ fontFamily: 'Times New Roman', textAlign: 'justify', fontSize: '15px',}}>{information.p4}</p>
      <p style={{ fontFamily: 'Times New Roman', textAlign: 'justify', fontSize: '15px',}}>{information.p5}</p>
      <p style={{ fontFamily: 'Times New Roman', textAlign: 'justify', fontSize: '15px',}}>{information.p6}</p>
      <p style={{ fontFamily: 'Times New Roman', textAlign: 'justify', fontSize: '15px',}}>{information.p7}</p>
      <p style={{ fontFamily: 'Times New Roman', textAlign: 'justify', fontSize: '15px',}}>{information.p8}</p>
      <p style={{ fontFamily: 'Times New Roman', textAlign: 'justify', fontSize: '15px',}}>{information.p9}</p>
      <p style={{ fontFamily: 'Times New Roman', textAlign: 'justify', fontSize: '15px',}}>{information.p10}</p>
      <p style={{ fontFamily: 'Times New Roman', textAlign: 'justify', fontSize: '15px',}}>{information.p11}</p>
      <p style={{ fontFamily: 'Times New Roman', textAlign: 'justify', fontSize: '15px',}}>{information.p12}</p>
      <p style={{ fontFamily: 'Times New Roman', textAlign: 'justify', fontSize: '15px',}}>{information.p13}</p>
 </div>
            </div>
 ))}
 <div className="card-footer bg-white">
            	<div className="form-check mt-1 ms-1">
                <input className="form-check-input" type="checkbox" required
                value={accept} 
                onChange={(e) => setAccept(e.target.value)}/>
                <label className="form-check-label">
           J'ai lu et j'accepte les conditions générales du site<span className="text-danger">*</span>
          </label>
              </div>
              <button type="submit" className="btn btn-primary mb-2 mt-3 fw-bold" style={{width: "200px" , height: "50px"}}>Submit</button>
            </div>
          
            </div>
      
        </div>
				</div>
			</div>
		</div>


          

     </form>
      </div>
      
<Footer/>
    </div>
);
};
export default Register;