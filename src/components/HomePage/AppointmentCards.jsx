import { Calendar, User } from "lucide-react";

/* --------------------- Single Card Component --------------------- */
const AppointmentCard = ({ variant }) => {
  const { bg, iconBg, labelColor, buttonColor } = variant;

  return (
    <div
      className={`rounded-3xl p-8 w-full shadow-lg ${bg}
      transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
      bg-opacity-90 backdrop-blur-sm`}
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className={`${iconBg} p-4 rounded-2xl shadow-md relative flex items-center justify-center`}
        >
          <Calendar className="w-7 h-7 text-white" strokeWidth={2.2} />
          <div className="absolute -bottom-1.5 -right-1.5 bg-white rounded-full p-1 shadow-md">
            <User className="w-4 h-4 text-gray-700" strokeWidth={2.2} />
          </div>
        </div>

        <div>
          <h2 className={`text-xl font-semibold leading-tight ${labelColor}`}>
            Book an
          </h2>
          <h2 className={`text-xl font-semibold leading-tight ${labelColor}`}>
            Appointment
          </h2>
        </div>
      </div>

      {/* Description */}
      <p className={`text-sm ${labelColor} opacity-70 leading-relaxed mb-6`}>
        Get expert medical care quickly and effortlessly. Book appointments with
        top specialists at your convenience.
      </p>

      {/* CTA Button */}
      <button
        className={`w-full bg-white ${buttonColor} font-semibold py-3 rounded-xl
        shadow-md hover:shadow-lg transition-all`}
      >
        Book Now
      </button>
    </div>
  );
};

/* --------------------- Main Section --------------------- */

export default function AppointmentCards() {
  const variants = [
    {
      bg: "bg-gradient-to-br from-yellow-50 to-yellow-200",
      iconBg: "bg-yellow-500",
      labelColor: "text-gray-800",
      buttonColor: "text-yellow-600",
    },
    {
      bg: "bg-gradient-to-br from-orange-50 to-orange-200",
      iconBg: "bg-orange-500",
      labelColor: "text-gray-800",
      buttonColor: "text-orange-600",
    },
    {
      bg: "bg-gradient-to-br from-blue-50 to-blue-300",
      iconBg: "bg-blue-700",
      labelColor: "text-gray-800",
      buttonColor: "text-blue-700",
    },
    {
      bg: "bg-gradient-to-br from-blue-100 to-blue-400",
      iconBg: "bg-blue-900",
      labelColor: "text-gray-800",
      buttonColor: "text-blue-900",
    },
  ];

  return (
    <section className="bg-gray-50 px-5 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {variants.map((item, idx) => (
          <AppointmentCard key={idx} variant={item} />
        ))}
      </div>
    </section>
  );
}
