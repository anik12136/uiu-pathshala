import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "react-hot-toast";
import useUser from "../../Hooks/useUser";

const ContactUs = () => {

    const { dbUser } = useUser();
    const form = useRef();
    const [loading, setLoading] = useState(false);


    const sendEmail = async (e) => {
        e.preventDefault();

        setLoading(true);

        emailjs
            .sendForm("service_jjvxrcm", "template_842qera", form.current, {
                publicKey: "sMLAPK9t_vVx2CU9_",
            })
            .then(
                () => {
                    toast.success("Email sent successfully!");
                    form.current.reset();
                },
                (error) => {
                    console.error("Failed to send email:", error.text);
                    toast.error("Failed to send email. Please try again.");
                }
            )
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <Toaster position="top-right" />

            <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Contact Us
                </h2>

                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                    <div className="hidden">
                        <label className="block text-gray-700">Student ID</label>
                        <input
                            type="text"
                            name="user_studentID"
                            value={dbUser.studentID}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="user_name"
                            value={dbUser.name}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="user_email"
                            value={dbUser.email}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Message</label>
                        <textarea
                            name="message"
                            required
                            rows="4"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-500 text-white py-2 rounded-lg font-semibold transition-all ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                            }`}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
