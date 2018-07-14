import React, { Component } from 'react';
import { VelocityComponent } from 'velocity-react';

export const AnimationWrapper = (InnerComponent) => (props) => (
    <VelocityComponent animation={'transition.slideUpIn'} runOnMount>
        <InnerComponent {...props} />
    </VelocityComponent>
);
