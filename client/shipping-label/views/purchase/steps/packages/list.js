import React, { PropTypes } from 'react';
import { translate as __ } from 'i18n-calypso';
import Gridicon from 'gridicons';
import classNames from 'classnames';
import getPackageDescriptions from './get-package-descriptions';

const PackageList = ( { selected, all, packageId, openPackage, addPackage } ) => {
	const renderAddPackage = () => {
		const boxesKeys = Object.keys( all );
		if ( ! boxesKeys.length ) {
			return null;
		}

		return ( <div className="wcc-packages-list__add-container">
			<a href="#" className="wcc-packages-list__link" onClick={ () => ( addPackage() ) }>
				<Gridicon icon="add-outline" size={ 18 } /> { __( 'Add package' ) }
			</a>
		</div> );
	};

	const renderPackageListItem = ( pckgId, name, count ) => {
		return (
			<div className="wcc-packages-list__item" key={ pckgId }>
				<div
					className={ classNames( 'wcc-packages-list-package', { selected: packageId === pckgId } ) }
					onClick={ () => ( openPackage( pckgId ) ) } >
					<span className="wcc-packages-list-package__name">{ name }</span>
					{ undefined !== count ? <span className="wcc-packages-list-package__count">{ count }</span> : null }
				</div>
			</div>
		);
	};

	const renderPackageListHeader = ( key, text ) => {
		return ( <div className="wcc-packages-list__item wcc-packages-list__header" key={ key }>{ text }</div> );
	};

	const packageLabels = getPackageDescriptions( selected, all, false );
	const packed = [];
	const individual = [];

	Object.keys( selected ).forEach( ( pckgId ) => {
		const pckg = selected[ pckgId ];

		if ( 'individual' === pckg.box_id ) {
			individual.push( renderPackageListItem( pckgId, pckg.items[ 0 ].name ) );
		} else {
			packed.push( renderPackageListItem( pckgId, packageLabels[ pckgId ], pckg.items.length ) );
		}
	} );

	if ( packed.length || individual.length ) {
		packed.unshift( renderPackageListHeader( 'boxed-header', __( 'Packages to be Shipped' ) ) );
	}

	if ( individual.length ) {
		//individual.unshift( renderPackageListHeader( 'individual-header', __( 'Original packaging' ) ) );
	}

	return (
		<div className="wcc-packages-list">
			{ renderAddPackage() }
			{ packed }
			{ individual }
		</div>
	);
};

PackageList.propTypes = {
	selected: PropTypes.object.isRequired,
	all: PropTypes.object.isRequired,
	packageId: PropTypes.string.isRequired,
};

export default PackageList;
