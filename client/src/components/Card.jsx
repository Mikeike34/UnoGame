import React from "react";

function Card({color, value, onClick, isPlayable = true, showBack = false}) {
    const colorClasses = {
        red: 'uno-red',
        blue: 'uno-blue',
        green: 'uno-green',
        yellow: 'uno-yellow',
        wild: 'bg-black'
    }

    const textColorClasses = {
        red: 'text-uno-red',
        blue: 'text-uno-blue',
        green: 'text-uno-green',
        yellow: 'text-uno-yellow',
        wild: 'text-white'

    }

    const getDisplayValue = () => {
        switch(value){
            case 'skip': return '⊘'
            case 'reverse': return '⇄'
            case 'draw2': return '+2'
            case '+4': return '+4'
            case 'wild': return 'WILD'
            default: return value.toString().toUpperCase()
        }
    }

    {/*Back of card design */}
    if(showBack) {
        return(
            <div
                onClick ={isPlayable ? onClick : undefined}
                className = {`
                    relative rounded-xl shadow-lg bg-white
                    overflow-hidden transition-all duration-200
                    ${isPlayable ? 'cursor-pointer hover:scale-110 hover:-translate-y-2' : 'cursor-default'}
                    w-16 h-24 sm:w-20 sm:h-32 md:w-24 md:h-36
                    `}
            >
                {/*Black background */}
                <div className="absolute inset-2 bg-black rounded-lg flex items-center justify-center overflow-hidden">
                    {/*Red diagonal oval */}
                    <div className="absolute w-14 h-20 sm:w-18 sm:h-32 bg-uno-red rounded-full transform rotate-45"></div>
                    {/*UNO logo */}
                    <div className="relative transform -rotate-15 overflow-hidden">
                        <span className="text-yellow-400 font-bold italic whitespace-nowrap block text-xl sm:text-3xl md:text-4xl" style ={{
                            textShadow: '2.5px 2.5px 0 #000, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff'
                        }}>
                            UNO
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    {/*Wild Card Design */}
    if(color === 'wild'){
        return(
            <div
                onClick={isPlayable ? onClick : undefined}
                className = {`
                    relative  rounded-xl shadow-lg bg-white transition-all duration-200
                    ${isPlayable ? 'cursor-pointer hover:scale-110 hover:-translate-y-2' : 'opacity-50 cursor-not-allowed'}
                    w-16 h-24 sm:w-20 sm:h-32 md:w-24 md:h-36
                    `}
            >
                {/*Background for wildcard */}
                <div className="absolute inset-1 sm:inset-2 bg-black rounded-lg overflow-hidden">
                    {/*Center image for wild card */}
                    <div className="absolute inset-2 sm:inset-3 bg-white rounded-full overflow-hidden">
                        <div className = 'absolute top-0 left-0 w-1/2 h-1/2 bg-uno-red rounded-tl-full'></div>
                        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-uno-blue rounded-tr-full"></div>
                        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-uno-yellow rounded-bl-full"></div>
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-uno-green rounded-br-full"></div>
                    </div>
                    {/*Small wild card ovals in corners */}
                    <div className="absolute top-1 left-1 w-2 h-1.5 sm:w-4 sm:h-3 bg-white rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-uno-red"></div>
                        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-uno-blue"></div>
                        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-uno-yellow"></div>
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-uno-green"></div>
                    </div>
                    <div className="absolute bottom-1 right-1 w-2 h-1.5 sm:w-4 sm:h-3 bg-white rounded-full overflow-hidden rotate-180">
                        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-uno-red"></div>
                        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-uno-blue"></div>
                        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-uno-yellow"></div>
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-uno-green"></div>
                    </div>
                    {/*Display value text for wild cards */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-bold drop-shadow-lg text-sm sm:text-lg md:text-xl">
                            {getDisplayValue()}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    //Regular numbered and action cards Design
    return(
        <div
            onClick={isPlayable ? onClick : undefined}
            className = {`
                relative rounded-xl shadow-lg
                transition-all duration-200
                ${isPlayable ? 'cursor-pointer hover:scale-110 hover:-translate-y-2' : 'opacity-50 cursor-not-allowed'}
                bg-white
                w-16 h-24 sm:w-20 sm:h-32 md:w-24 md:h-36
                `}
        >
                {/*Colored background with white borders*/}
                <div className = {`absolute inset-1 sm:inset-2 bg-${colorClasses[color]} rounded-lg`}>
                    <div className="absolute inset-2 sm:inset-3 bg-white rounded-full flex items-center justify-center">
                        <span className={`
                           ${value === 'skip' || value === 'reverse' ? 'text-base sm:text-xl md:text-2xl' : 
                            value === 'draw2' || value === '+4' ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl'}
                           font-bold
                           ${textColorClasses[color]} 
                            `}>
                            {getDisplayValue()}
                        </span>
                    </div>
                    {/*Small number in top-left corner */}
                    <div className={`absolute top-0.5 left-1.5 text-white font-bold text-[8px] sm:text-[10px] md:text-xs`}>
                        {getDisplayValue()}
                    </div>
                    {/*Small number in top-left corner */}
                    <div className = {`absolute bottom-0.5 right-1.5 text-white font-bold rotate-180 text-[8px] sm:text-[10px] md:text-sm`}>
                            {getDisplayValue()}
                    </div>
                </div>
        </div>
    )
}

export default Card