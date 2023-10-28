import { callExternalApi, callExternalApiWithBody, callExternalPdfApiWithBody } from "./external-api";

const apiServerUrl = import.meta.env.VITE_REST_API_SERVER_URL;

export const downloadInvoicePdf = async (accessToken, invoice_no, company_name) => {

    fetch(`${apiServerUrl}/pdf/invoice`, {
        method: "POST",
        body: JSON.stringify({
            "invoice_no": invoice_no,
            "company_name": company_name,
        }),
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    }).then(response => {
        response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = "" + company_name + "_" + invoice_no + ".pdf";
            a.click();
        });
    });
}

export const printInvoicePdf = async (accessToken, invoice_no, company_name) => {

    fetch(`${apiServerUrl}/pdf/invoice`, {
        method: "POST",
        body: JSON.stringify({
            "invoice_no": invoice_no,
            "company_name": company_name,
        }),
        headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    }).then(response => {
        response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            window.open(url).print();
        });
    });
}