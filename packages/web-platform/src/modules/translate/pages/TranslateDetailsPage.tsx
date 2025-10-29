import { Link, useNavigate } from '@tanstack/react-router';
import { Breadcrumb } from 'antd';

import { TranslateDetailsLeftPanel } from '~/translate/components/TranslateDetailsLeftPanel';
import { TranslateDetailsRightPanel } from '~/translate/components/TranslateDetailsRightPanel';

export function TranslateDetailsPage() {
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('Save translate data');
    // TODO: Send data to API
    // Example: await saveTranslateData(data);
  };

  const handleSaveAsTemplate = (templateName: string) => {
    console.log('Save as template:', templateName);
    // TODO: Save template
  };

  const handleBack = () => {
    navigate({ to: '/translate/import' });
  };

  return (
    <div className="p-6 bg-bg-tertiary h-full">
      {/* Breadcrumb */}
      <Breadcrumb
        className="mb-6"
        items={[
          {
            title: <Link to="/translate">Translate</Link>,
          },
          {
            title: 'Details',
          },
        ]}
      />

      <div className="grid grid-cols-[440px_1fr] gap-6 h-[calc(100vh-120px)]">
        {/* Left Panel */}
        <TranslateDetailsLeftPanel
          fileName="document-01.png"
          onBack={handleBack}
          useMockData={true}
        />

        {/* Right Panel */}
        <TranslateDetailsRightPanel
          onSave={handleSave}
          onSaveAsTemplate={handleSaveAsTemplate}
          useMockData={true}
        />
      </div>
    </div>
  );
}
