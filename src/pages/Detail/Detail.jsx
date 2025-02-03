import { useParams } from 'react-router-dom';
import BlogContent from '../../components/BlogContent/BlogContent';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import './Detail.css';

export default function Detail() {
  const { id } = useParams();

  return (
    <div className="detail-page">
      <BlogContent blogId={id} />
      <ActionButtons blogId={id} />
    </div>
  );
}