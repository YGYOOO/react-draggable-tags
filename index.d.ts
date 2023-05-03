declare module 'react-draggable-tags' {
    import * as React from 'react';

    export interface DraggableProps<T> {
        tags: Array<T>;
        render: (arg: { tag: T; index: number }) => JSX.Element;
        onChange?: (tags: Array<T>) => void;
        isList?: boolean;
        initialTags?: Array<T>;
        getAddTagFunc?: Function;
        withHotspot?: boolean;
        style?: React.CSSProperties;
        tagStyle?: React.CSSProperties;
        build?: (arg: { tag: T; index: number }) => JSX.Element;
        className?: string;
    }

    export class DraggableArea<T> extends React.Component<DraggableProps<T>, unknown> { }
}
