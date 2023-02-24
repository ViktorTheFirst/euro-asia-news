// our-domain.com/bills/[billsType]
import { useRouter } from 'next/router';

const BillsPage = () => {
  const router = useRouter();
  const routeName = router.query.billsType;
  //console.log('router.query.billsType', router.query.billsType);

  return <div>{`Bills page - bill type: ${routeName}`}</div>;
};

export default BillsPage;
