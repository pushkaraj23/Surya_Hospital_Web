import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchPolicyById } from "../../api/userApi";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DetailedPolicyPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ------------ Fetch policy by ID ------------ */
  useEffect(() => {
    const loadPolicy = async () => {
      try {
        const res = await fetchPolicyById(id);
        setPolicy(res);
      } catch (err) {
        console.error("Error loading policy:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPolicy();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pt-36 pt-28 px-6">
      {/* BACK BUTTON */}
      <div className="max-w-5xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary font-semibold 
                     hover:text-secondary transition-colors duration-200"
        >
          <span className="text-2xl leading-none">←</span>
          <span>Back</span>
        </button>
      </div>

      {/* ------------ HEADER ------------ */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center mb-10"
      >
        <h1
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 
                       bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          {policy?.title || "Policy Details"}
        </h1>

        <div className="text-sm text-gray-500">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>{" "}
          /{" "}
          <Link to="/policies" className="hover:text-primary">
            Policies
          </Link>{" "}
          / <span className="text-primary font-semibold">{policy?.title}</span>
        </div>
      </motion.div>

      {/* ------------ LOADING ------------ */}
      {loading && (
        <p className="text-center text-gray-600 text-lg">Loading policy...</p>
      )}

      {/* ------------ NO DATA ------------ */}
      {!loading && !policy && (
        <p className="text-center text-gray-600 text-lg">Policy not found.</p>
      )}

      {/* ------------ POLICY CONTENT ------------ */}
      {!loading && policy && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-8 md:p-12 
                     border border-gray-200"
        >
          {/* Title */}
          <h2 className="text-2xl font-bold text-primary mb-6">
            {policy.title}
          </h2>

          {/* Rich text content */}
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed policy-content"
            dangerouslySetInnerHTML={{ __html: policy.policy }}
          ></div>
        </motion.div>
      )}
    </div>
  );
}
