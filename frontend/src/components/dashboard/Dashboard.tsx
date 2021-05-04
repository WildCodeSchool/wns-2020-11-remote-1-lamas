import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { FIND_USER } from '../../graphql/queries/getUser';

interface RouteParams {
  id: string;
}

const Dashboard = (): JSX.Element => {
  const { id } = useParams<RouteParams>();

  const { loading, error, data } = useQuery(FIND_USER, {
    variables: { userId: id },
  });

  return <></>;
};

export default Dashboard;
