import React from 'react';
import { Calendar, User } from 'lucide-react';

const AppointmentCard = ({ bgColor, iconBgColor, textColor, buttonTextColor }) => {
  return (
    <div className={`${bgColor} rounded-3xl p-10 w-full shadow-lg`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`${iconBgColor} p-3 rounded-2xl relative`}>
          <Calendar className="w-15 h-15 text-white" strokeWidth={2.5} />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
            <User className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
          </div>
        </div>
        <div>
          <h2 className={`text-2xl font-bold ${textColor}`}>Book an</h2>
          <h2 className={`text-2xl font-bold ${textColor}`}>Appointment</h2>
        </div>
      </div>
      
      <p className={`${textColor} opacity-70 mb-6 text-sm`}>
        lorem ipsum, lorelasdj lkflskdfoiw dkfok dkfoiw dkdof jdoej
      </p>
      
      <button className={`w-full bg-white ${buttonTextColor} font-bold py-3 px-6 rounded-xl hover:shadow-md transition-shadow`}>
        Book Now!
      </button>
    </div>
  );
};

export default function AppointmentCards() {
  const cardVariants = [
    {
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-300',
      iconBgColor: 'bg-yellow-500 ',
      textColor: 'text-gray-800',
      buttonTextColor: 'text-yellow-600'
    },
    {
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-300',
      iconBgColor: 'bg-orange-500',
      textColor: 'text-gray-800',
      buttonTextColor: 'text-orange-600'
    },
    {
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-300',
      iconBgColor: 'bg-blue-700',
      textColor: 'text-gray-800',
      buttonTextColor: 'text-blue-700'
    },
    {
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-300',
      iconBgColor: 'bg-blue-900',
      textColor: 'text-gray-800',
      buttonTextColor: 'text-blue-900'
    }
  ];

  return (
    <div className=" bg-gray-50 px-8 mt-20">
      <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-8">
        {cardVariants.map((variant, index) => (
          <AppointmentCard key={index} {...variant} />
        ))}
      </div>
    </div>
  );
}