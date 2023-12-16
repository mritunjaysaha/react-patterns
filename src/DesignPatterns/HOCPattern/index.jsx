import React, { useEffect, useState } from "react";

function withLoader(Element, url) {
    return (props) => {
        const [data, setData] = useState(null);

        useEffect(() => {
            async function getData() {
                const res = await fetch(url);
                const data = await res.json();
                setData(data);
            }

            getData();
        }, []);

        if (!data) {
            return <div>Loading...</div>;
        }

        return <Element {...props} data={data} />;
    };
}

function withHover(Element) {
    return (props) => {
        const [hovering, setHover] = useState(false);

        return (
            <Element
                {...props}
                hovering={hovering}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            />
        );
    };
}

function DogImages(props) {
    return (
        <div {...props}>
            {props.hovering && <div id="hover">Hovering!</div>}
            <div id="list">
                {props.data.message.map((dog, index) => (
                    <img src={dog} alt="Dog" key={index} />
                ))}
            </div>
        </div>
    );
}

export default withHover(
    withLoader(DogImages, "https://dog.ceo/api/breed/labrador/images/random/6")
);

function useHover() {
    const [hovering, setHover] = useState(false);
    const ref = useRef(null);

    const handleMouseOver = () => setHover(true);
    const handleMouseOut = () => setHover(false);

    useEffect(() => {
        const node = ref.current;
        if (node) {
            node.addEventListener("mouseover", handleMouseOver);
            node.addEventListener("mouseout", handleMouseOut);

            return () => {
                node.removeEventListener("mouseover", handleMouseOver);
                node.removeEventListener("mouseout", handleMouseOut);
            };
        }
    }, [ref.current]);

    return [ref, hovering];
}

function DogImagesUseHover(props) {
    const [hoverRef, hovering] = useHover();

    return (
        <div ref={hoverRef} {...props}>
            {hovering && <div id="hover">Hovering</div>}
            <div id="list">
                {props.data.message.map((dog, index) => (
                    <img src={dog} alt="Dog" key={index} />
                ))}
            </div>
        </div>
    );
}
