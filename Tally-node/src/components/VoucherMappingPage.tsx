import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { RefreshCw, Plus, Edit, Trash2, Zap } from "lucide-react";
import { Layout } from "./Layout";
import { useState } from "react";

interface VariableMapping {
  voucherVariable: string;
  campaignVariable: string;
  campaignLabel: string;
}

interface VoucherCampaignMapping {
  id: string;
  voucherType: string;
  campaign: string;
  status: 'Active' | 'Draft';
  variableMappings: VariableMapping[];
}

interface VoucherMappingPageProps {
  onNext: () => void;
  onUseDefaults?: () => void;
}

export function VoucherMappingPage({ onNext, onUseDefaults }: VoucherMappingPageProps) {
  const [selectedVoucherType, setSelectedVoucherType] = useState<string>("");
  const [selectedCampaign, setSelectedCampaign] = useState<string>("");
  const [selectedVoucherVariable, setSelectedVoucherVariable] = useState<string>("");
  const [selectedCampaignVariable, setSelectedCampaignVariable] = useState<string>("");
  const [variableMappings, setVariableMappings] = useState<VariableMapping[]>([]);
  const [voucherCampaignMappings, setVoucherCampaignMappings] = useState<VoucherCampaignMapping[]>([]);

  const voucherTypes = [
    "Sales", "Purchase", "Credit Note", "Debit Note", 
    "Receipt", "Payment", "Ledger", "All Vouchers"
  ];

  const campaigns = [
    "Sales Campaign 1", "Purchase Campaign 1", "Payment Reminder"
  ];

  const voucherVariables = [
    { value: "voucher_number", label: "Voucher Number" },
    { value: "customer_name", label: "Customer Name" },
    { value: "amount", label: "Amount" },
    { value: "date", label: "Date" },
    { value: "due_date", label: "Due Date" },
    { value: "reference", label: "Reference" },
  ];

  const campaignVariables = [
    { value: "{{1}}", label: "Variable 1" },
    { value: "{{2}}", label: "Variable 2" },
    { value: "{{3}}", label: "Variable 3" },
    { value: "{{4}}", label: "Variable 4" },
    { value: "{{5}}", label: "Variable 5" },
    { value: "{{6}}", label: "Variable 6" },
  ];

  // Initialize with some existing mappings for demonstration
  useState(() => {
    setVoucherCampaignMappings([
      { 
        id: '1', 
        voucherType: "Sales", 
        campaign: "Sales Campaign 1", 
        status: "Active",
        variableMappings: [
          { voucherVariable: "voucher_number", campaignVariable: "{{1}}", campaignLabel: "Variable 1" },
          { voucherVariable: "customer_name", campaignVariable: "{{2}}", campaignLabel: "Variable 2" }
        ]
      },
      { 
        id: '2', 
        voucherType: "Payment", 
        campaign: "Payment Reminder", 
        status: "Active",
        variableMappings: [
          { voucherVariable: "amount", campaignVariable: "{{1}}", campaignLabel: "Variable 1" }
        ]
      },
      { 
        id: '3', 
        voucherType: "Purchase", 
        campaign: "Purchase Campaign 1", 
        status: "Draft",
        variableMappings: []
      },
    ]);
  });

  // Get available voucher variables (not already mapped)
  const getAvailableVoucherVariables = () => {
    return voucherVariables.filter(variable => 
      !variableMappings.some(mapping => mapping.voucherVariable === variable.value)
    );
  };

  // Get available campaign variables (not already mapped)
  const getAvailableCampaignVariables = () => {
    return campaignVariables.filter(variable => 
      !variableMappings.some(mapping => mapping.campaignVariable === variable.value)
    );
  };

  const handleAddMapping = () => {
    if (selectedVoucherVariable && selectedCampaignVariable) {
      const voucherVar = voucherVariables.find(v => v.value === selectedVoucherVariable);
      const campaignVar = campaignVariables.find(v => v.value === selectedCampaignVariable);
      
      if (voucherVar && campaignVar) {
        const newMapping: VariableMapping = {
          voucherVariable: selectedVoucherVariable,
          campaignVariable: selectedCampaignVariable,
          campaignLabel: campaignVar.label,
        };
        
        setVariableMappings([...variableMappings, newMapping]);
        setSelectedVoucherVariable("");
        setSelectedCampaignVariable("");
      }
    }
  };

  const handleEditMapping = (index: number) => {
    const mappingToEdit = variableMappings[index];
    setSelectedVoucherVariable(mappingToEdit.voucherVariable);
    setSelectedCampaignVariable(mappingToEdit.campaignVariable);
    
    // Remove the mapping from the list
    const updatedMappings = variableMappings.filter((_, i) => i !== index);
    setVariableMappings(updatedMappings);
  };

  const handleSaveMapping = () => {
    if (selectedVoucherType && selectedCampaign && variableMappings.length > 0) {
      const newMapping: VoucherCampaignMapping = {
        id: Date.now().toString(),
        voucherType: selectedVoucherType,
        campaign: selectedCampaign,
        status: 'Draft',
        variableMappings: [...variableMappings]
      };
      
      setVoucherCampaignMappings([...voucherCampaignMappings, newMapping]);
      
      // Reset form
      setSelectedVoucherType("");
      setSelectedCampaign("");
      setVariableMappings([]);
      setSelectedVoucherVariable("");
      setSelectedCampaignVariable("");
    }
  };

  const handleDeleteMapping = (id: string) => {
    setVoucherCampaignMappings(voucherCampaignMappings.filter(mapping => mapping.id !== id));
  };

  const canSaveCurrentMapping = selectedVoucherType && selectedCampaign && variableMappings.length > 0;
  const canProceedNext = voucherCampaignMappings.length > 0;

  return (
    <Layout currentPage="Voucher Mapping">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-gray-900">Custom Voucher-Campaign Mapping</h1>
          {onUseDefaults && (
            <Button 
              variant="outline" 
              onClick={onUseDefaults}
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <Zap className="h-4 w-4 mr-2" />
              Use Default Templates Instead
            </Button>
          )}
        </div>

        {/* Mapping Configuration */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">Configure Mapping</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Select Tally Voucher Type</Label>
                <Select value={selectedVoucherType} onValueChange={setSelectedVoucherType}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select voucher type" />
                  </SelectTrigger>
                  <SelectContent>
                    {voucherTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-700">Select Campaign</Label>
                <div className="flex gap-2">
                  <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                    <SelectTrigger className="flex-1 border-gray-300">
                      <SelectValue placeholder="Select campaign" />
                    </SelectTrigger>
                    <SelectContent>
                      {campaigns.map((campaign) => (
                        <SelectItem key={campaign} value={campaign}>
                          {campaign}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" className="border-gray-300">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button variant="outline" className="border-gray-300">
              <Plus className="h-4 w-4 mr-2" />
              Create New Campaign
            </Button>

            {/* Variable Mapping Section */}
            <div className="border border-gray-300 rounded p-4 bg-gray-50">
              <h3 className="text-sm text-gray-700 mb-4">Variable Mapping</h3>
              
              {/* Mapping Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <Label className="text-gray-700">Voucher Variable</Label>
                  <Select value={selectedVoucherVariable} onValueChange={setSelectedVoucherVariable}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select voucher variable" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableVoucherVariables().map((variable) => (
                        <SelectItem key={variable.value} value={variable.value}>
                          {variable.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-700">Campaign Variable</Label>
                  <Select value={selectedCampaignVariable} onValueChange={setSelectedCampaignVariable}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select campaign variable" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableCampaignVariables().map((variable) => (
                        <SelectItem key={variable.value} value={variable.value}>
                          {variable.value} - {variable.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    onClick={handleAddMapping} 
                    disabled={!selectedVoucherVariable || !selectedCampaignVariable}
                    className="w-full bg-gray-800 hover:bg-gray-700 disabled:bg-gray-300"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Mapping
                  </Button>
                </div>
              </div>

              {/* Current Mappings List */}
              {variableMappings.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-gray-700">Current Variable Mappings</Label>
                  <div className="space-y-2">
                    {variableMappings.map((mapping, index) => (
                      <div key={index} className="flex items-center justify-between bg-white border border-gray-300 rounded p-3">
                        <div className="text-sm text-gray-700">
                          <span className="font-medium">
                            {voucherVariables.find(v => v.value === mapping.voucherVariable)?.label}
                          </span>
                          <span className="mx-2 text-gray-500">→</span>
                          <span className="font-medium">
                            {mapping.campaignVariable}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditMapping(index)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {variableMappings.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No variable mappings added yet. Select variables from the dropdowns above and click "Add Mapping".
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleSaveMapping}
                disabled={!canSaveCurrentMapping}
                className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-300"
              >
                <Plus className="h-4 w-4 mr-2" />
                Save Voucher-Campaign Mapping
              </Button>
              {!canSaveCurrentMapping && (
                <p className="text-sm text-gray-500 flex items-center">
                  Select voucher type, campaign, and add at least one variable mapping to save.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Existing Mappings Table */}
        <Card className="border border-gray-300">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">
              All Voucher-Campaign Mappings ({voucherCampaignMappings.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {voucherCampaignMappings.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-300">
                    <TableHead className="text-gray-700">Voucher Type</TableHead>
                    <TableHead className="text-gray-700">Campaign</TableHead>
                    <TableHead className="text-gray-700">Variable Mappings</TableHead>

                    <TableHead className="text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {voucherCampaignMappings.map((mapping) => (
                    <TableRow key={mapping.id} className="border-gray-300">
                      <TableCell className="text-gray-600">{mapping.voucherType}</TableCell>
                      <TableCell className="text-gray-600">{mapping.campaign}</TableCell>
                      <TableCell className="text-gray-600">
                        <div className="text-xs">
                          {mapping.variableMappings.length > 0 ? (
                            <div className="space-y-1">
                              {mapping.variableMappings.slice(0, 2).map((varMapping, idx) => (
                                <div key={idx} className="text-gray-500">
                                  {voucherVariables.find(v => v.value === varMapping.voucherVariable)?.label} → {varMapping.campaignVariable}
                                </div>
                              ))}
                              {mapping.variableMappings.length > 2 && (
                                <div className="text-gray-400">
                                  +{mapping.variableMappings.length - 2} more
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">No mappings</span>
                          )}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteMapping(mapping.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No voucher-campaign mappings created yet.</p>
                <p className="text-sm mt-1">Create your first mapping using the form above.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Button - Prominently placed at bottom */}
        <div className="flex items-center justify-between p-6 bg-white border border-gray-300 rounded-lg">
          <div className="flex-1">
            <h3 className="text-lg text-gray-900 mb-1">Ready to proceed?</h3>
            <p className="text-sm text-gray-600">
              {canProceedNext 
                ? `You have ${voucherCampaignMappings.length} voucher-campaign mapping(s) configured. Click Next to continue with plugin setup.`
                : "Create at least one voucher-campaign mapping to proceed to the next step."
              }
            </p>
          </div>
          <Button 
            onClick={onNext}
            disabled={!canProceedNext}
            className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-300 px-8"
            size="lg"
          >
            Next: Plugin Setup
          </Button>
        </div>
      </div>
    </Layout>
  );
}