import React from "react";

import "./fadeto.css";
import {FadeToCtx} from "../contexts";

// full screen fade transition with intermediate loading screen
// should also provide a context so other components can trigger the fade using fadeToOverlay(<component>)

export default class FadeTo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFading: false,
            overlay: null,
            task: null,
            renderFade: false,
        }

        this.fadeToComponent = this.fadeToComponent.bind(this);
        // attach to FadeToCtx
        FadeToCtx.fadeToComponent = this.fadeToComponent;
    }

    fadeToComponent(component) {
        const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

        (async () => {
            try {
                this.setState({renderFade: true});
                await delay(100);
                this.setState({isFading: true});
                await delay(500);
                this.setState({isFading: false, overlay: component});
                await delay(500);
                this.setState({renderFade: false});
            } catch (e) {
                console.error(e);
            }
        })();
    }

    render() {
        return (
            <div>
                {this.state.renderFade &&
                    <div className={"loading-screen " + (this.state.isFading ? "fade-show" : "fade-hidden")}>
                        <div className="loader"/>
                        <img src="/assets/logo.png" alt="Logo" className="logo"/>
                    </div>}
                <FadeToCtx.Provider value={{
                    fadeToComponent: this.fadeToComponent
                }}>
                    {this.state.overlay ? this.state.overlay : this.props.children}
                </FadeToCtx.Provider>
            </div>
        )
    }
}