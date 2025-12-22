import { Card } from "@/components";

const Welcome = () => {


  return (

        <div className="flex-1">
          <Card>
            <Card.Header>
                <div className="flex">
                  <h1>Witamy !</h1>
                </div>
            </Card.Header>
            <Card.Body>
            <p>DASHBOARD !!! Witamy na najnowszej wersji aplikacji !</p>
            </Card.Body>
          </Card>
        </div>
  );
};

export default Welcome;