import ActorCard from "../actor-card/actor-card";
import './actor-list.scss';

type TDataResponse = {
  id: number;
  image: string;
  profile_path: string;
  name: string;
  alt: string;
  character: string;
}

type TProps = {
  data: TDataResponse[];
}

const ActorList = ({data}: TProps): JSX.Element => {
  return (
    <div className="actors">
      {
        data.map(el => 
          <ActorCard
            key={el.id}
            id={el.id}
            image={el.profile_path}
            name={el.name}
            alt={el.name}
            character={el.character}
          />
        )
      }
    </div>
  )
}

export default ActorList;