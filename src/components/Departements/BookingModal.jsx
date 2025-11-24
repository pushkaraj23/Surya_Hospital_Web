import { useState } from "react";

export default function BookingModal({ department, doctor, onClose }) {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    name: "",
    phone: "",
    reason: "",
  });

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM",
    "2:00 PM", "2:30 PM", "4:00 PM",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entity = doctor || department;
    alert(`Appointment booked with ${entity.name} on ${formData.date} at ${formData.time}`);
    onClose();
  };

  const entity = doctor || department;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-bold">
            Book Appointment — {entity.name}
          </h3>
          <button onClick={onClose}>✖</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="date" name="date" value={formData.date}
            onChange={handleChange} className="w-full p-3 border rounded"
            min={new Date().toISOString().split("T")[0]} required />

          <select name="time" value={formData.time}
            onChange={handleChange} className="w-full p-3 border rounded" required>
            <option>Select Time</option>
            {timeSlots.map((t) => <option key={t}>{t}</option>)}
          </select>

          <input type="text" name="name" value={formData.name}
            onChange={handleChange} placeholder="Your Name" className="w-full p-3 border rounded" required />

          <input type="tel" name="phone" value={formData.phone}
            onChange={handleChange} placeholder="Phone Number" className="w-full p-3 border rounded" required />

          <textarea name="reason" value={formData.reason}
            onChange={handleChange} placeholder="Reason (Optional)" className="w-full p-3 border rounded" rows="3" />

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
