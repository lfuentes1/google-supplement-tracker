
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Supplement } from './Supplements';
import SupplementCard from './SupplementCard';
import { Search } from 'lucide-react';

interface MySupplementsProps {
    supplements: Supplement[];
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedSupplement: Supplement) => void;
}

const MySupplements = ({ supplements, onDelete, onUpdate }: MySupplementsProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSupplements = supplements.filter(supplement => {
        const term = searchTerm.toLowerCase();
        if (!term) return true;
        const nameMatch = supplement.name.toLowerCase().includes(term);
        const factMatch = supplement.nutritionFacts.some(fact =>
            fact.name.toLowerCase().includes(term)
        );
        return nameMatch || factMatch;
    });

    if (supplements.length === 0) {
        return <p className="text-sm text-muted-foreground text-center py-4">You haven't added any supplements yet.</p>
    }

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name or nutrition fact..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
            <div className="space-y-2">
                {filteredSupplements.map(supplement => (
                    <SupplementCard
                        key={supplement.id}
                        supplement={supplement}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                ))}
            </div>
        </div>
    );
};

export default MySupplements;
