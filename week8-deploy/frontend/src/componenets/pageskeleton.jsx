function pageskeleton() {
    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', animation: 'pulse 1.5s infinite' }}>
            <div style={{ height: '32px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '16px', width: '60%' }} />
            <div style={{ height: '16px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '8px' }} />
            <div style={{ height: '16px', background: '#e2e8f0', borderRadius: '4px', marginBottom: '8px', width: '80%' }} />
            <div style={{ height: '16px', background: '#e2e8f0', borderRadius: '4px', width: '40%' }} />
            <style>{`@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }`}</style>
        </div>
    );
}

export default pageskeleton;