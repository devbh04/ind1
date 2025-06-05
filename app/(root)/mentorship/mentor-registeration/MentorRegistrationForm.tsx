"use client"
import React, { useState } from 'react';
import { UserCircle, ArrowLeft, Camera, RefreshCw } from 'lucide-react';

const MentorRegistrationForm = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      {/* Header Section */}
      <div className="rounded-lg shadow-sm p-4 md:p-6 mb-6 border border-yellow-100">
        <div className='bg-amber-100 p-4 md:p-7 pb-1 mb-4 md:mb-7 border border-amber-500 rounded-xl w-full'>
          <h1 className="text-xl md:text-2xl font-semibold text-green-900 mb-4 md:mb-6">Become an Unstoppable Mentor!</h1>
          <h2 className="text-base md:text-lg font-medium text-green-900 mb-2 md:mb-4">Enter your details</h2>
          <div className="flex w-28 md:w-36 mb-4 md:mb-6 h-1">
            <div className="bg-yellow-500 w-3/4"></div>
            <div className="bg-white w-1/4"></div>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="relative">
            <div className="w-20 h-20 md:w-30 md:h-30 bg-gray-100 rounded-full flex items-center justify-center">
              <img className='w-10 md:w-20' src="https://cdn.unstop.com/uploads/images/unstop/avatar_mentor.svg" alt="Profile" />
            </div>
            <button className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full">
              <Camera size={20} className="md:size-5" />
            </button>
          </div>
        </div>

        {/* Name Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2 text-sm md:text-base">First Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="firstName"
              className="w-full border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
              placeholder="First Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 text-sm md:text-base">Last Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="lastName"
              className="w-full border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
              placeholder="Last Name"
            />
          </div>
        </div>

        {/* Profile Link */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">Profile Link<span className="text-green-500">*</span> <span className="text-gray-500 text-xs md:text-sm">Note: Once saved, profile link cannot be changed</span></label>
          <div className="flex items-center gap-1">
            <div className="bg-green-50 p-2 md:p-3 h-10 md:h-13">
              <div className="flex items-center">
                <div className="bg-green-900 text-white p-1 rounded-full mr-1 w-6 md:w-8 text-center">
                  <span className="text-xs md:text-base font-bold">un</span>
                </div>
              </div>
            </div>
            <input
              type="text"
              name="profileLink"
              className="flex-grow border border-gray-300 rounded-r-md p-2 md:p-3 text-sm md:text-base"
              placeholder='username'
            />
          </div>
        </div>

        {/* Gender Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">Gender<span className="text-red-500">*</span></label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {[
              { label: "Male", icon: "https://d8it4huxumps7.cloudfront.net/uploads/images/form-step/Male.svg" },
              { label: "Female", icon: "https://d8it4huxumps7.cloudfront.net/uploads/images/form-step/Female.svg" },
              { label: "Transgender", icon: "https://d8it4huxumps7.cloudfront.net/uploads/images/form-step/Transgender.svg" },
              { label: "Intersex", icon: "https://d8it4huxumps7.cloudfront.net/uploads/images/form-step/Intersex.svg" },
              { label: "Non-binary", icon: "https://d8it4huxumps7.cloudfront.net/uploads/images/form-step/Non-binary.svg" },
              { label: "Others", icon: "https://d8it4huxumps7.cloudfront.net/uploads/images/form-step/Others.svg" }
            ].map((option) => (
              <button 
                key={option.label}
                type="button" 
                className='flex items-center gap-2 md:gap-5 border border-gray-200 p-2 md:p-5 rounded-xl text-xs md:text-sm'
              >
                <img className='h-4 md:h-6' src={option.icon} alt={option.label} />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Organization */}
        <div className="mt-4 mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">Current Organisation/Institute<span className="text-red-500">*</span></label>
          <div className="flex">
            <input
              type="text"
              name="organization"
              className="w-full border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
              placeholder="Current Organization"
            />
            <button className="bg-green-50 text-green-600 p-3 md:p-5 ml-2 rounded border border-green-100">
              <RefreshCw size={14} className="md:size-4" />
            </button>
          </div>
        </div>

        {/* Industry */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">Industry<span className="text-red-500">*</span></label>
          <div className="relative">
            <select
              name="industry"
              className="w-full border border-gray-300 rounded-md p-2 md:p-3 appearance-none bg-white text-sm md:text-base"
            >
              <option value="si">Select industry</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              {/* Other options remain the same */}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Current Role */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">Current Role<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="currentRole"
            className="w-full border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
            placeholder="Current Role"
          />
        </div>

        {/* Work Experience */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">Work Experience<span className="text-red-500">*</span></label>
          <input
            type="number"
            name="workExperience"
            className="w-full border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
            placeholder="Total years of work experience"
          />
        </div>

        {/* Headline */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">Headline<span className="text-red-500">*</span></label>
          <input
            type="text"
            name="headline"
            className="w-full border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
            placeholder="Example: McKinsey & Co. | ISB | Chartered Accountant | CFA (Cleared Level 3) | 740 GMAT"
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">Bio/About you<span className="text-red-500">*</span></label>
          <textarea
            name="bio" 
            className="resize-none w-full p-2 h-32 md:h-40 mb-4 outline-none border border-green-200 rounded-sm text-sm md:text-base"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>

        {/* Languages */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">Languages you're fluent in<span className="text-red-500">*</span></label>
          <div className="relative w-full">
            <select
              name="languages"
              className="w-full border border-gray-300 rounded-md p-2 md:p-3 mb-4 appearance-none bg-white text-sm md:text-base"
            >
              <option value="si">Select languages</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              {/* Other options remain the same */}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">Social Media Handles<span className="text-red-500">*</span></label>
          {[
            { 
              name: "linkedin", 
              placeholder: "https://LinkedIn Link", 
              icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEU7V53///85VZzP1eVMZabv8feHlsEyUZo2U5siRpXn6/Npe7Dm6fN6irnz9PhSbKpugLIpS5fHz+MoSpdYcKza3uq2v9ilsM+apsnFy97Y3uxMZqc+W6BVbqx9j72+xtxgd7CQoMekr8+xudSFlcB0hrcVP5IUgLSUAAADZklEQVR4nO3c4XKiMBSGYfaAJkULIliosqC13fu/xGW3MzvTnZEGMJ5zMt/7vw7PEEGS0ChCCCGEEEIIIYQQQgghhBBCCCElEZG19Bn3sdw5MqYoTZQkeVXleX5KkqQlU5bFkDHG6gbbAfeza677w+Gw/dfhT/G+f7k2l253zqOy1Kmkoswv/SrLftwu+9sqTtQRh+9ce37bjti+QnPLfcTTIttW66MrT6HQRps6neBTJzRV7Tw8NQrJNFPGpz5hkb9O9qkSFt3UAapLSNSM3fz0Cyl5mQnUIrTXuUAdQireZgN1CItmPlCF0Oym/U5TJ7RtvACoQRjNvowqEdpuFbaQTnN+jKoSruf9WFMjpNOiy4wCoe0WAqULifahC6ulQOnCctm9UL6QzMILqXih2S0GChfeYZAKF9KShwoNQrtZ/jWULTWXacJse4z3/9efBK89Fb2zLe3XlXkqy8/V0S8JBhIdHH3xpS2NYMmtbOU2yZ02rUbekPlwupSmneSBOJpZuzzdZ+9KT+CQcVqpqLkPc0GFy0T38Sz4dvddhcsMTW3VjtHhWuogTDvDfZjzo8hBeKwUD9KodZjBeG25j3JJicM0W694kEbkIqwL7sNckIswa0I/h9kldOEqfOEaQslBCKH8IIRQfhBCKD8IIZQfhBDKD0IIhUT2ZsZF+F7c/oDPmIHJZne75++X8bO382Y85sU3+3FcjfQtcDiJ2/HSPe+kuHm+w6an8cIX1ryXogcImSfFHyD8CF7IvG/vAcKWdyODf2HKvAruXxgHfw5fotCFDfN+Iv/CdfDCHfOzhX/hJnRhyr0pzLswzkP/Hvbc/wbLu/DKvbHPu7BhBvoXsk/F+RZmz9xTbb6FKfcN37vweObe5u5buOe+HXoX9gkz0Lvwyvx06F/IPFnqXyhgj7Rn4Yr/hRrPwi377dC3UMB7bZ6FMf9r3J6Fr+w3izuskGYjf55d2S80A7F8ul3ksI7f/Rr5AOnvRAWyF2MkCCGUH4QQyg9CCOUHIYTygxBC+UEIofwghFB+EEIoPwghlB+EEMoPQgjlByGE8oMQQvlBCKH8IIRQfhBCKD8IIZQfhBDKD0II5QchhPKDEEL5QQih/CCEUH4QQig/CCGUH4QQyg9CCOUHIYTye6DwNyCOWdL4wqRQAAAAAElFTkSuQmCC" 
            },
            { 
              name: "facebook", 
              placeholder: "https://Facebook Link", 
              icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEU7V53///85VZzP1eVMZabv8feHlsEyUZo2U5siRpXn6/Npe7Dm6fN6irnz9PhSbKpugLIpS5fHz+MoSpdYcKza3uq2v9ilsM+apsnFy97Y3uxMZqc+W6BVbqx9j72+xtxgd7CQoMekr8+xudSFlcB0hrcVP5IUgLSUAAADZklEQVR4nO3c4XKiMBSGYfaAJkULIliosqC13fu/xGW3MzvTnZEGMJ5zMt/7vw7PEEGS0ChCCCGEEEIIIYQQQgghhBBCCCElEZG19Bn3sdw5MqYoTZQkeVXleX5KkqQlU5bFkDHG6gbbAfeza677w+Gw/dfhT/G+f7k2l253zqOy1Kmkoswv/SrLftwu+9sqTtQRh+9ce37bjti+QnPLfcTTIttW66MrT6HQRps6neBTJzRV7Tw8NQrJNFPGpz5hkb9O9qkSFt3UAapLSNSM3fz0Cyl5mQnUIrTXuUAdQireZgN1CItmPlCF0Oym/U5TJ7RtvACoQRjNvowqEdpuFbaQTnN+jKoSruf9WFMjpNOiy4wCoe0WAqULifahC6ulQOnCctm9UL6QzMILqXih2S0GChfeYZAKF9KShwoNQrtZ/jWULTWXacJse4z3/9efBK89Fb2zLe3XlXkqy8/V0S8JBhIdHH3xpS2NYMmtbOU2yZ02rUbekPlwupSmneSBOJpZuzzdZ+9KT+CQcVqpqLkPc0GFy0T38Sz4dvddhcsMTW3VjtHhWuogTDvDfZjzo8hBeKwUD9KodZjBeG25j3JJicM0W694kEbkIqwL7sNckIswa0I/h9kldOEqfOEaQslBCKH8IIRQfhBCKD8IIZQfhBDKD0IIhUT2ZsZF+F7c/oDPmIHJZne75++X8bO382Y85sU3+3FcjfQtcDiJ2/HSPe+kuHm+w6an8cIX1ryXogcImSfFHyD8CF7IvG/vAcKWdyODf2HKvAruXxgHfw5fotCFDfN+Iv/CdfDCHfOzhX/hJnRhyr0pzLswzkP/Hvbc/wbLu/DKvbHPu7BhBvoXsk/F+RZmz9xTbb6FKfcN37vweObe5u5buOe+HXoX9gkz0Lvwyvx06F/IPFnqXyhgj7Rn4Yr/hRrPwi377dC3UMB7bZ6FMf9r3J6Fr+w3izuskGYjf55d2S80A7F8ul3ksI7f/Rr5AOnvRAWyF2MkCCGUH4QQyg9CCOUHIYTygxBC+UEIofwghFB+EEIoPwghlB+EEMoPQgjlByGE8oPwPwv4B1JhQYQkAAAAAElFTkSuQmCC" 
            },
            { 
              name: "youtube", 
              placeholder: "https://Youtube Link", 
              icon: "https://cdn.unstop.com/uploads/images/unstop/mentor_youtube_icon.png" 
            },
            { 
              name: "instagram", 
              placeholder: "https://Instagram Link", 
              icon: "https://d8it4huxumps7.cloudfront.net/uploads/images/63cf6ae3e312c_240px_instagram_icon.png" 
            }
          ].map((social) => (
            <div key={social.name} className="mb-3">
              <div className="flex items-center border border-gray-200 rounded-md">
                <div className="p-1 md:p-2 rounded mr-2 ml-3">
                  <img className='h-4 md:h-5' src={social.icon} alt={social.name} />
                </div>
                <input
                  type="text"
                  name={`socialMedia.${social.name}`}
                  className="w-full rounded-md p-2 md:p-3 border border-transparent focus:outline-none text-sm md:text-base"
                  placeholder={social.placeholder}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse md:flex-row justify-between gap-3 mt-6 mb-10 md:mb-20">
        <button className="px-4 py-2 md:px-6 md:py-2 bg-gray-300 text-gray-600 rounded-md text-sm md:text-base">
          Submit
        </button>
      </div>
    </div>
  );
};

export default MentorRegistrationForm;