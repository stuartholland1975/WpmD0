import {Link} from "@mui/material";

const Hyperlink = props => {
    const {data} = props
    return (
        <Link
            href={`${process.env.REACT_APP_API_ENDPOINT}/documents/${data["headerDocumentFile"].id}`}
            target={'_blank'}>
            {data.headerDocumentFile.id}
        </Link>
    );

}

export default Hyperlink