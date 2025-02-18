const BackgroundCircles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* First Circle */}
            <div
                className="absolute w-96 h-96 bg-blue-400 rounded-full opacity-30 blur-3xl"
                style={{
                    top: '5%',
                    left: '8%',
                }}
            ></div>

            {/* Second Circle */}
            <div
                className="absolute w-80 h-80 bg-yellow-400 rounded-full opacity-30 blur-3xl"
                style={{
                    top: '25%',
                    left: '40%',
                }}
            ></div>

            {/* Third Circle */}
            <div
                className="absolute w-72 h-72 bg-teal-400 rounded-full opacity-30 blur-3xl"
                style={{
                    top: '10%',
                    left: '68%',
                }}
            ></div>

            {/* Fourth Circle */}
            <div
                className="absolute w-96 h-96 bg-pink-500 rounded-full opacity-30 blur-3xl"
                style={{
                    bottom: '20%',
                    left: '80%',
                }}
            ></div>

            {/* Fifth Circle */}
            <div
                className="absolute w-80 h-80 bg-indigo-500 rounded-full opacity-30 blur-3xl"
                style={{
                    top: '50%',
                    left: '25%',
                }}
            ></div>

            {/* Sixth Circle */}
            <div
                className="absolute w-72 h-72 bg-purple-400 rounded-full opacity-30 blur-3xl"
                style={{
                    top: '90%',
                    left: '35%',
                }}
            ></div>
        </div>
    );
};

export default BackgroundCircles;
