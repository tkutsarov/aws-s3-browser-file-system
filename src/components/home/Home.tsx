import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { updateConfig } from "../../redux/config/configSlice";
import Input from "../common/input/Input";
import Button from "../common/button/Button";

import './Home.css';

const Home = () => {
  const [accessKey, setAccessKey] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [bucketName, setBucketName] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(updateConfig({accessKey, secretAccessKey, bucketName}));

    navigate('/file-explorer');
  }

  return (
    <div className="config-input card">
      <div>
        <label>Access key</label>
        <Input name="access-key" value={accessKey} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccessKey(e.target.value)} />
      </div>
      <div>
        <label>Secret Access key</label>
        <Input name="secret-access-key" value={secretAccessKey} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecretAccessKey(e.target.value)} />
      </div>
      <div>
        <label>Bucket name</label>
        <Input name="bucket-name" value={bucketName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBucketName(e.target.value)} />
      </div>
      <Button name="Submit configuration" onClick={handleSubmit} />
    </div>
  )
}

export default Home;
