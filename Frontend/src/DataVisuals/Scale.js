import React, { useEffect } from "react";
import { scale } from "../Images/Images";
import { Img, Text, Container, Div, Label } from "../Styles/ScaleStyles";

const Scale = ({ Weight = 20 }) => {
  const [weight, setWeight] = React.useState(0);
  useEffect(() => {
    setWeight(Weight);
  }, [Weight]);
  return (
    <Div>
      <Container>
        <Img src={scale} alt="Scale" />
        <Text>{weight}</Text>
        <Label>g</Label>
      </Container>
    </Div>
  );
};

export default Scale;
