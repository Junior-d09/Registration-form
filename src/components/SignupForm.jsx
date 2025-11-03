import React, { useState } from "react";
import "./SignupForm.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
  });


  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

 
  const validateForm = () => {
    const newErrors = {};
    if (formData.name.trim().length < 3)
        newErrors.name = "Le nom est requis 3 caractères minimum !";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email invalide.";
    if (formData.password.length < 8)
      newErrors.password = "Mot de passe trop court (min 8 caractères).";
     if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password))
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    if (
      !formData.age ||
      isNaN(Number(formData.age)) ||
      Number(formData.age) < 18
    )
      newErrors.age = "Âge invalide (minimum 18 ans).";
    if (!formData.gender) newErrors.gender = "Veuillez sélectionner un genre.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      age: true,
      gender: true,
    });
    if (Object.keys(validationErrors).length === 0) {
      setIsConfirming(true);
    } else {
      //   setErrors(validationErrors);
    }
  };

  const confirmSubmit = () => {
    console.log("Formulaire soumis :", formData);
    setIsSubmitted(true);
    setIsConfirming(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: "",
      gender: "",
    });
   
    setTouched({});
  };

  const currentErrors = validateForm();
  const hasErrors = Object.keys(currentErrors).length > 0;

  return (
    <div className="form-container">
      <h2>Formulaire d'inscription</h2>

      {isSubmitted ? (
        <div className="success-msg"> Inscription réussie 🎉 !</div>
      ) : isConfirming ? (
        <div className="confirmation-box">
          <h3>Confirmez vos informations :</h3>
          <ul>
            <li>
              <strong>Nom :</strong> {formData.name}
            </li>
            <li>
              <strong>Email :</strong> {formData.email}
            </li>
            <li>
              <strong>Âge :</strong> {formData.age}
            </li>
            <li>
              <strong>Genre :</strong> {formData.gender}
            </li>
          </ul>
          <div className="confirmation-buttons">
            <button onClick={() => setIsConfirming(false)}>Modifier</button>
            <button onClick={confirmSubmit} className="submit-btn">
              Confirmer
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Nom */}
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && currentErrors.name && (
              <p className="error">{currentErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && currentErrors.email && (
              <p className="error">{currentErrors.email}</p>
            )}
          </div>

          {/* Mot de passe */}
          <div className="form-group password-group">
            <label>Mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                touched.password && currentErrors.password ? "input-error" : ""
              }
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
            {touched.password && currentErrors.password && (
              <p className="error">{currentErrors.password}</p>
            )}
          </div>

            {/* Confirmer le mot de passe */}
          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.confirmPassword && currentErrors.confirmPassword && (
              <p className="error">{currentErrors.confirmPassword}</p>
            )}
            
          </div>

          {/* Âge */}
          <div className="form-group">
            <label>Âge</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.age && currentErrors.age && (
              <p className="error">{currentErrors.age}</p>
            )}
          </div>

          {/* Genre */}
          <div className="form-group">
            <label>Genre</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Sélectionnez</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Autre">Autre</option>
            </select>
            {touched.gender && currentErrors.gender && (
              <p className="error">{currentErrors.gender}</p>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={hasErrors}>
            S'inscrire
          </button>
        </form>
      )}
    </div>
  );
};

export default SignupForm;
