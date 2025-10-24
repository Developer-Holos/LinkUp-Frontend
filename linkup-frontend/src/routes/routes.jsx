import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const Login = lazy(() => import("../pages/Login/Login"));
const Afiliados = lazy(() => import("../pages/Afiliados/Afiliados"));
const Sedes = lazy(() => import("../pages/Sedes/Sedes"));
const Entrenadores = lazy(() => import("../pages/Entrenadores/Entrenadores"));
const Clientes = lazy(() => import("../pages/Clientes/Clientes"));
const Referidores = lazy(() => import("../pages/Referidores/Referidores"));

const LoadingSpinner = () => (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column'
    }}>
        <div style={{ 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 2s linear infinite'
        }}></div>
        <p style={{ marginTop: '10px', color: '#666' }}>Cargando página...</p>
    </div>
);

export default function AppRoutes() {
    return (
        <Router>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/afiliados" element={<Afiliados />} />
                    <Route path="/sedes" element={<Sedes />} />
                    <Route path="/entrenadores" element={<Entrenadores />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/referidores" element={<Referidores />} />

                    {/* Redirigir rutas no encontradas al inicio */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </Router>
    );
}