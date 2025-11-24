// src/components/departments/DoctorProfile.jsx

import { useState } from "react";
import BookingModal from "./BookingModal";

export default function DoctorProfile({ doctor, onBack }) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button onClick={onBack} className="text-blue-600">
            ← Back
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="bg-blue-600 text-white p-8 text-center">
              <img
                src={doctor.image}
                className="w-28 h-28 rounded-full object-cover mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold">{doctor.name}</h2>
              <p>{doctor.specialization}</p>
              <p className="mt-2 text-blue-100">
                Experience: {doctor.experience}
              </p>
            </div>

            <div className="md:col-span-2 p-6">
              <h3 className="text-xl font-bold mb-3">About</h3>
              <p className="text-gray-700 mb-6">{doctor.bio}</p>

              <h4 className="font-bold mb-2">Schedule</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                {doctor.availableDays.map((day, idx) => (
                  <div key={idx} className="flex justify-between py-1">
                    <span>{day}</span>
                    <span>{doctor.timings}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <BookingModal
          doctor={doctor}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}
