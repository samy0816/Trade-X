import React, { useState } from 'react';
import axios from 'axios';

function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isLogin, setIsLogin] = useState(false);
    const [demoLoading, setDemoLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? '/login' : '/signup';
            const response = await axios.post(`https://trade-x-iaaz.onrender.com${endpoint}`, formData);
            
            if (response.data.message.includes('successful')) {
                // Save user info for dashboard to display
                localStorage.setItem('tradeXUser', JSON.stringify(response.data.user || {}));
                // Redirect to dashboard live URL
                window.location.href = 'https://zesty-liger-ed149b.netlify.app/';
            }
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    const handleDemoLogin = async () => {
        setDemoLoading(true);
        try {
            const response = await axios.post('https://trade-x-iaaz.onrender.com/demo-login');
            if (response.data.message.includes('successful')) {
                localStorage.setItem('tradeXUser', JSON.stringify(response.data.user || {}));
                window.location.href = 'https://zesty-liger-ed149b.netlify.app/';
            }
        } catch (error) {
            // Even if backend errors, still try redirect (demo fallback works client-side too)
            localStorage.setItem('tradeXUser', JSON.stringify({ id: 'demo-001', email: 'demo@tradex.dev', name: 'Demo User' }));
            window.location.href = 'https://zesty-liger-ed149b.netlify.app/';
        } finally {
            setDemoLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div style={{ marginBottom: '15px' }}>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required={!isLogin}
                            style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                        />
                    </div>
                )}
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '15px' }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                    onClick={() => setIsLogin(!isLogin)}
                    style={{ background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}
                >
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </p>

            <hr style={{ margin: '20px 0', borderColor: '#e0e0e0' }} />

            <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#666', fontSize: '13px', marginBottom: '8px' }}>
                    Recruiter or just testing? Skip the signup:
                </p>
                <button
                    onClick={handleDemoLogin}
                    disabled={demoLoading}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: demoLoading ? '#999' : '#22c55e',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '15px',
                        fontWeight: 600,
                        cursor: demoLoading ? 'default' : 'pointer'
                    }}
                >
                    {demoLoading ? 'Signing in…' : '🚀 Instant Demo Access'}
                </button>
            </div>
        </div>
    );
}

export default SignupPage;
