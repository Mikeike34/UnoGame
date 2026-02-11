import React from "react";

/*Color wheel for selecting a color when a wild card is played */

function ColorPicker({onColorSelect, onCancel}){
    const colors = [
        {name: 'red', bgClass: 'bg-uno-red', label: 'Red'},
        {name: 'blue', bgClass: 'bg-uno-blue', label: 'Blue'},
        {name: 'green', bgClass: 'bg-uno-green', label: 'Green'},
        {name: 'yellow', bgClass: 'bg-uno-yellow', label: 'Yellow'}
    ];

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-md mx-4">
                {/*Title of Wheel*/}
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Pick a Color: </h2>

                {/*Color Wheel */}
                <div className="relative w-64 h-64 mx-auto mb-6">
                    {/*Top Left - Red */}
                    <button
                        onClick={() => onColorSelect('red')}
                        className = 'absolute top-0 left-0 w-32 h-32 bg-uno-red hover:opacity-80 active:opacity-80 active:scale-110 transition-opacity cursor-pointer rounded-tl-full border-2 border-white flex items-center justify-center group'
                        style={{clipPath: 'polygon(100% 100%, 0% 100%, 0% 0%, 100% 0%)'}}
                    >
                        <span className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 active:opacity-100 active:scale-110 transition-opacity absolute top-14 left-11">
                            Red
                        </span>
                    </button>

                    {/*Top Right - Blue */}
                    <button
                        onClick={() => onColorSelect('blue')}
                        className = 'absolute top-0 right-0 w-32 h-32 bg-uno-blue hover:opacity-80 active:opacity-80 active:scale-110 transition-opacity cursor-pointer rounded-tr-full border-2 border-white flex items-center justify-center group'
                        style={{clipPath: 'polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%'}}
                    >
                        <span className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 active:opacity-100 active:scale-110 transition-opacity absolute top-14 right-11">
                            Blue
                        </span>
                    </button>

                    {/*Bottom Left - Green */}
                    <button
                        onClick={() => onColorSelect('green')}
                        className = 'absolute bottom-0 left-0 w-32 h-32 bg-uno-green hover:opacity-80 active:opacity-80 active:scale-110 transition-opacity cursor-pointer rounded-bl-full border-2 border-white flex items-center justify-center group'
                        style={{clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%'}}
                    >
                        <span className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 active:opacity-100 active:scale-110 transition-opacity absolute bottom-14 left-10">
                            Green
                        </span>
                    </button>

                    {/*Bottom Right - Yellow */}
                    <button
                        onClick={() => onColorSelect('yellow')}
                        className = 'absolute bottom-0 right-0 w-32 h-32 bg-uno-yellow hover:opacity-80 active:opacity-80 active:scale-110 transition-opacity cursor-pointer rounded-br-full border-2 border-white flex items-center justify-center group'
                        style={{clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%'}}
                    >
                        <span className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 active:opacity-100 active:scale-110 transition-opacity absolute bottom-14 right-10">
                            Yellow
                        </span>
                    </button>

                    {/*Center of Wheel - White Circle */}
                    <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 border-4 border-gray-300 shadow-lg"></div>
                </div>

                {/*Cancel Button */}
                <button
                    onClick={onCancel}
                    className="mt-4 px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default ColorPicker;