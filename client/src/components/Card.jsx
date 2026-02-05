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

    if(showBack) {
        return(
            <div
                onClick ={isPlayable ? onClick : undefined}
                className = {`
                    relative w-24 h-36 rounded-xl shadow-lg bg-white
                    overflow-hidden transition-all duration-200
                    ${isPlayable ? 'cursor-pointer hover:scale-110 hover:-translate-y-2' : 'cursor-default'}
                    `}
            >
                {/*Black background */}
                <div className="absolute inset-2 bg-black rounded-lg flex items-center justify-center overflow-hidden">
                    {/*Red diagonal oval */}
                    <div className="absolute w-18 h-32 bg-uno-red rounded-full transform rotate-45"></div>
                    {/*UNO logo */}
                    <div className="relative transform -rotate-15 overflow-hidden">
                        <span className="text-yellow-400 text-4xl font-bold italic whitespace-nowrap block" style ={{
                            textShadow: '2px 2px 0 #000, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff'
                        }}>
                            UNO
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    if(color === 'wild'){
        return(
            <div
                onClick={isPlayable ? onClick : undefined}
                className = {`
                    relative w-24 h-36 rounded-xl shadow-lg bg-white transition-all duration-200
                    ${isPlayable ? 'cursor-pointer hover:scale-110 hover:-translate-y-2' : 'opacity-50 cursor-not-allowed'}
                    `}
            >
                {/*Background for wildcard */}
                <div className="absolute inset-2 bg-black rounded-lg overflow-hidden">
                    {/*Center image for wild card */}
                    <div className="absolute inset-3 bg-white rounded-full overflow-hidden">
                        <div className = 'absolute top-0 left-0 w-1/2 h-1/2 bg-uno-red rounded-tl-full'></div>
                        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-uno-blue rounded-tr-full"></div>
                        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-uno-yellow rounded-bl-full"></div>
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-uno-green rounded-br-full"></div>
                    </div>
                    {/*Small wild card ovals in corners */}
                    <div className="absolute top-1 left-1 w-4 h-3 bg-white rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-uno-red"></div>
                        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-uno-blue"></div>
                        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-uno-yellow"></div>
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-uno-green"></div>
                    </div>
                    <div className="absolute bottom-1 right-1 w-4 h-3 bg-white rounded-full overflow-hidden rotate-180">
                        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-uno-red"></div>
                        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-uno-blue"></div>
                        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-uno-yellow"></div>
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-uno-green"></div>
                    </div>
                    {/*Display value text for wild cards */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-xl font-bold drop-shadow-lg">
                            {getDisplayValue()}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    //Regular numbered and action cards
    return(
        <div
            onClick={isPlayable ? onClick : undefined}
            className = {`
                relative w-24 h-36 rounded-xl shadow-lg
                transition-all duration-200
                ${isPlayable ? 'cursor-pointer hover:scale-110 hover:-translate-y-2' : 'opacity-50 cursor-not-allowed'}
                bg-white
                `}
        >
                {/*Colored background with white borders*/}
                <div className = {`absolute inset-2 bg-${colorClasses[color]} rounded-lg`}>
                    <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
                        <span className={`
                           ${value === 'skip' || value === 'reverse' ? 'text-2xl' : value === 'draw2' || value === '+4' ? 'text-3xl' : 'text-4xl'}
                           font-bold
                           ${textColorClasses[color]} 
                            `}>
                            {getDisplayValue()}
                        </span>
                    </div>
                    {/*Small number in top-left corner */}
                    <div className={`absolute top-0.5 left-1.5 text-white text-xs font-bold`}>
                        {getDisplayValue()}
                    </div>
                    {/*Small number in top-left corner */}
                    <div className = {`absolute bottom-0.5 right-1.5 text-white text-sm font-bold rotate-180`}>
                            {getDisplayValue()}
                    </div>
                </div>
        </div>
    )
}

export default Card